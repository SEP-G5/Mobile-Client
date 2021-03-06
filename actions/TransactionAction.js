import { Cryptography } from '../services/CryptographyService';
import { Peer } from '../services/PeerService';
import { Storage } from '../services/StorageService';
import { Task } from '../services/TaskService';

export const SEND_PENDING_TRANSACTIONS_INTERVAL = 60 * 60;
export const SEND_PENDING_TRANSACTIONS_TASK = 'send_pending_transactions_task';

import { transactionToBuffer } from '../utils/transactionBuffer';

export const STORAGE_TRANSACTIONS = 'transactions';

export const SEND_TRANSACTION_URL = '/transaction';
export const GET_TRANSACTIONS_URL = '/transaction';

export const CREATE_TRANSACTION_REQUEST = 'create_transaction_request';
export const CREATE_TRANSACTION_FAILURE = 'create_transaction_failure';
export const CREATE_TRANSACTION_SUCCESS = 'create_transaction_success';
export const VERIFY_TRANSACTION_REQUEST = 'verify_transaction_request';
export const VERIFY_TRANSACTION_FAILURE = 'verify_transaction_failure';
export const VERIFY_TRANSACTION_SUCCESS = 'verify_transaction_success';
export const SEND_TRANSACTION_REQUEST = 'send_transaction_request';
export const SEND_TRANSACTION_FAILURE = 'send_transaction_failure';
export const SEND_TRANSACTION_SUCCESS = 'send_transaction_success';
export const GET_TRANSACTIONS_REQUEST = 'get_transactions_request';
export const GET_TRANSACTIONS_FAILURE = 'get_transactions_failure';
export const GET_TRANSACTIONS_SUCCESS = 'get_transactions_success';
export const SAVE_TRANSACTION_REQUEST = 'save_transaction_request';
export const SAVE_TRANSACTION_FAILURE = 'save_transaction_failure';
export const SAVE_TRANSACTION_SUCCESS = 'save_transaction_success';
export const SET_CURRENT_IN_OVERLAY = 'set_current_in_overlay';
export const SET_VIEW_DETAIL = 'set_view_detail';
export const SET_SN = 'set_sn';
export const SET_NAME = 'set_name';
export const RESET_REGISTER_BIKE_STATE = 'reset_register_bike_state';
export const RESET_TRANSFER_OWNERSHIP_STATE = 'reset_transfer_ownership_state';


export const createTransaction = (id, publicKeyInput, publicKeyOutput, privateKey) => {
    return (dispatch) => {
        dispatch(createTransactionRequest());

        return createTransactionAsync(id, publicKeyInput, publicKeyOutput, privateKey).then(function (transaction) {
            dispatch(createTransactionSuccess(transaction));
        }).catch(function (error) {
            dispatch(createTransactionFailure(error));
        });
    }
}

export const verifyTransaction = (transaction) => {
    return (dispatch) => {
        dispatch(verifyTransactionRequest());

        return verifyTransactionAsync(transaction).then(function (valid) {
            dispatch(verifyTransactionSuccess(valid));
        }).catch(function (error) {
            dispatch(verifyTransactionFailure(error));
        });
    }
}

const createTransactionAsync = (id, publicKeyInput, publicKeyOutput, privateKey) => {
    return new Promise(async function (resolve) {
        let date = new Date();
        let transaction = {
            id: id,
            publicKeyInput: publicKeyInput,
            publicKeyOutput: publicKeyOutput,
            timestamp: Math.round(date.getTime() / 1000)
        };
        let transactionBuffer = transactionToBuffer(transaction);
        Cryptography.sign(privateKey, transactionBuffer).then(function (signature) {
            resolve({
                ...transaction,
                signature: signature
            });
        });
    });
}

const verifyTransactionAsync = (transaction) => {
    return new Promise(async function (resolve) {
        var transactionClone = {};
        Object.assign(transactionClone, transaction);

        var key = "";
        if (transactionClone.publicKeyInput) // transfer
            key = transactionClone.publicKeyInput;
        else // registration
            key = transactionClone.publicKeyOutput;

        var signature = transactionClone.signature;
        delete transactionClone.signature;
        var transactionBuffer = transactionToBuffer(transactionClone);

        Cryptography.verify(key, signature, transactionBuffer).then(function (valid) {

            resolve({
                valid: valid
            });
        });
    });
}

export const sendTransaction = (transaction) => {
    return (dispatch) => {
        dispatch(sendTransactionRequest());
        const request = {
            method: 'post',
            data: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        console.log(transaction);

        Peer.sendRequest(SEND_TRANSACTION_URL, request).then(function (response) {
            //We need to process the response
            if (response.status === 200){
                dispatch(sendTransactionSuccess(response));
            } else {
                dispatch(sendTransactionFailure(response));
            }
        }).catch(function (error) {

            // if it is due to missing peers or no internet connection, save the transaction
            if (error.response) {
                dispatch(sendTransactionFailure(error.response));
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error) {
                // save the transaction
                dispatch(saveTransaction(transaction));
                Task.register(SEND_PENDING_TRANSACTIONS_TASK, SEND_PENDING_TRANSACTIONS_INTERVAL).then(function () {
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });
    }
}

export const saveTransaction = (transaction) => {
    return (dispatch) => {
        dispatch(saveTransactionRequest());
        saveTransactionAsync(transaction).then(function () {
            dispatch(saveTransactionSuccess());
        }).catch(function (error) {
            dispatch(saveTransactionFailure(error));
        });
    }
}

export const sendPendingTransactions = () => {
    return new Promise(async function (resolve, reject) {
        getPendingTransactionsAsync.then(function (transactions) {
            transactions.forEach(async function (transaction) {
                await saveTransactionAsync(transaction);
            });
            resolve();
        }).catch(function (error) {
            reject(error);
        });
    });
}

const getPendingTransactionsAsync = () => {
    return new Promise(async function (resolve, reject) {
        let pendingTransactionsString = await Storage.get(STORAGE_TRANSACTIONS);
        let pendingTransactions = [];
        try {
            pendingTransactions = JSON.parse(pendingTransactionsString)
        } catch (e) {
            reject(e);
        }
        if (!Array.isArray(pendingTransactions))
            pendingTransactions = []
        resolve(pendingTransactions);
    });
}

const saveTransactionAsync = (transaction) => {
    return new Promise(async function (resolve, reject) {
        getPendingTransactionsAsync().then(function (pendingTransactions) {
            if (pendingTransactions.includes(transaction)) // already saved
                reject(new Error('This transaction has already been saved.'));
            pendingTransactions.push(transaction);
            Storage.set(STORAGE_TRANSACTIONS, JSON.stringify(pendingTransactions)).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            })
        }).catch(function (error) {
            reject(error);
        });
    });
}

export const getTransactions = (limit = 0, skip = 0, publicKey = undefined, id = undefined) => {
    return (dispatch) => {
        dispatch(getTransactionsRequest());
        const request = {
            method: 'get',
            params: {
                id: id,
                publicKey: publicKey
            }
        };
        Peer.sendRequest(GET_TRANSACTIONS_URL, request).then(function (response) {
            dispatch(getTransactionsSuccess(response));
        }).catch(function (error) {
            dispatch(getTransactionsFailure(error));
        });
    }
}

const createTransactionRequest = () => {
    return {
        type: CREATE_TRANSACTION_REQUEST
    }
}

const createTransactionFailure = (error) => {
    return {
        type: CREATE_TRANSACTION_FAILURE,
        payload: {
            error
        }
    }
}

const createTransactionSuccess = (transaction) => {
    return {
        type: CREATE_TRANSACTION_SUCCESS,
        payload: {
            ...transaction
        }
    }
}

const verifyTransactionRequest = () => {
    return {
        type: VERIFY_TRANSACTION_REQUEST
    }
}

const verifyTransactionFailure = (error) => {
    return {
        type: VERIFY_TRANSACTION_FAILURE,
        payload: {
            error
        }
    }
}

const verifyTransactionSuccess = (valid) => {
    return {
        type: VERIFY_TRANSACTION_SUCCESS,
        payload: {
            ...valid
        }
    }
}

const sendTransactionRequest = () => {
    return {
        type: SEND_TRANSACTION_REQUEST
    }
}

const sendTransactionFailure = (error) => {
    return {
        type: SEND_TRANSACTION_FAILURE,
        payload: {
            error
        }
    }
}

const sendTransactionSuccess = (response) => {
    return {
        type: SEND_TRANSACTION_SUCCESS
    }
}

const getTransactionsRequest = () => {
    return {
        type: GET_TRANSACTIONS_REQUEST
    }
}

const getTransactionsFailure = (error) => {
    return {
        type: GET_TRANSACTIONS_FAILURE,
        payload: {
            error
        }
    }
}

const getTransactionsSuccess = (transactions) => {
    return {
        type: GET_TRANSACTIONS_SUCCESS,
        payload: transactions
    }
}

const saveTransactionRequest = () => {
    return {
        type: SAVE_TRANSACTION_REQUEST
    }
}

const saveTransactionFailure = (error) => {
    return {
        type: SAVE_TRANSACTION_FAILURE,
        payload: {
            error
        }
    }
}

const saveTransactionSuccess = () => {
    return {
        type: SAVE_TRANSACTION_SUCCESS,
    }
}

/**
 * Set the transaction that is currently in the detail overlay.
 * @param transaction
 */
export const setCurrentInOverlay = (transaction) => {
    return (dispatch) => {
        dispatch(setViewDetail(true));
        dispatch(setCurrentInOverlaySuccess(transaction));
    }
};

const setCurrentInOverlaySuccess = (transaction) => {
    return {
        type: SET_CURRENT_IN_OVERLAY,
        payload: transaction
    }
};

/**
 * Set boolean that show the BicycleDetail Component.
 * @param value
 * @returns {{type, payload: *}}
 */
export const setViewDetail = (value) => {
    return {
        type: SET_VIEW_DETAIL,
        payload: value
    }
};

/**
 * Set Bike's Serial Number into state from the Register Form
 * @param value
 * @returns {{payload: *, type: string}}
 */
export const setSn = (value) => {
    return {
        type: SET_SN,
        payload: value
    }
};

/**
 * Set Bike's Name into state from the Register Form
 * @param value
 * @returns {{payload: *, type: string}}
 */
export const setName = (value) => {
    return {
        type: SET_NAME,
        payload: value
    }
};

/**
 * Reset the state that handles bike registration.
 * @returns {{type: string}}
 */
export const resetRegisterBikeState = () => {
    return {
        type: RESET_REGISTER_BIKE_STATE
    }
};

/**
 * Reset the state that handles transfer of ownership.
 * @returns {{type: string}}
 */
export const resetTransferOwnershipState = () => {
    return {
        type: RESET_TRANSFER_OWNERSHIP_STATE
    }
};