import { Cryptography } from '../services/CryptographyService';

export const CREATE_TRANSACTION_REQUEST = 'create_transaction_request';
export const CREATE_TRANSACTION_FAILURE = 'create_transaction_failure';
export const CREATE_TRANSACTION_SUCCESS = 'create_transaction_success';
export const VERIFY_TRANSACTION_REQUEST = 'verify_transaction_request';
export const VERIFY_TRANSACTION_FAILURE = 'verify_transaction_failure';
export const VERIFY_TRANSACTION_SUCCESS = 'verify_transaction_success';

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
        // send transaction to the blockchain, store it if offline
    }
}

export const getTransactions = (limit = 0, skip = 0, publicKey = undefined, id = undefined) => {
    return (dispatch) => {
        // send request to the blockchain
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