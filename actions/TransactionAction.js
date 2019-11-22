import { Cryptography } from '../services/CryptographyService';
import { Peer } from '../services/PeerService';

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
        var date = new Date();
        var transaction = {
            id: id,
            publicKeyInput: publicKeyInput,
            publicKeyOutput: publicKeyOutput,
            timestamp: Math.round(date.getTime() / 1000)
        };

        Cryptography.sign(privateKey, transaction).then(function (signature) {
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

        Cryptography.verify(key, signature, transactionClone).then(function (valid) {

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
            data: transaction
        };
        Peer.sendRequest(SEND_TRANSACTION_URL, request).then(function (response) {
            dispatch(sendTransactionSuccess());
        }).catch(function (error) {
            dispatch(sendTransactionFailure(error));
            // if it is due to missing peers or no internet connection, save the transaction
        });
    }
}

export const getTransactions = (limit = 0, skip = 0, publicKey = undefined, id = undefined) => {
    return (dispatch) => {
        dispatch(getTransactionsRequest());
        const request = {
            method: 'get',
            query: {
                limit: limit,
                skip: skip,
                publicKey: publicKey,
                id: id,
            }
        };
        Peer.sendRequest(SEND_TRANSACTION_URL, request).then(function (response) {
            dispatch(getTransactionsSuccess());
        }).catch(function (error) {
            dispatch(getTransactionsFailure());
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

const sendTransactionSuccess = () => {
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
        payload: {
            ...transactions
        }
    }
}