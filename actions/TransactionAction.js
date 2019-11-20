import { JSEncrypt } from 'jsencrypt'
import sha256 from 'crypto-js/sha256';

export const CREATE_TRANSACTION_REQUEST = 'create_transaction_request';
export const CREATE_TRANSACTION_FAILURE = 'create_transaction_failure';
export const CREATE_TRANSACTION_SUCCESS = 'create_transaction_success';

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

export const sendTransaction = (transaction) => {
    return (dispatch) => {
        // send transaction to the blockchain, store it if offline
    }
}

const createTransactionAsync = (id, publicKeyInput, publicKeyOutput, privateKey) => {
    return new Promise(async function (resolve) {
        var crypt = new JSEncrypt();

        crypt.setKey(privateKey);

        var date = new Date();
        var transaction = {
            id: id,
            publicKeyInput: publicKeyInput,
            publicKeyOutput: publicKeyOutput,
            timestamp: Math.round(date.getTime() / 1000)
        };

        var signature = crypt.sign(transaction, sha256);

        transaction = {
            ...transaction,
            signature: signature
        }

        resolve(transaction);
    });
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