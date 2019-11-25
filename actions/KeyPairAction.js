import { Cryptography, PUBLIC_KEY, PRIVATE_KEY } from '../services/CryptographyService';
import { Storage } from '../services/StorageService';

export const GET_KEYPAIR_REQUEST = 'get_keypair_request';
export const GET_KEYPAIR_FAILURE = 'get_keypair_failure';
export const GET_KEYPAIR_SUCCESS = 'get_keypair_success';
export const CREATE_KEYPAIR_REQUEST = 'create_keypair_request';
export const CREATE_KEYPAIR_FAILURE = 'create_keypair_failure';
export const CREATE_KEYPAIR_SUCCESS = 'create_keypair_success';
export const DELETE_KEYPAIR_REQUEST = 'delete_keypair_request';
export const DELETE_KEYPAIR_FAILURE = 'delete_keypair_failure';
export const DELETE_KEYPAIR_SUCCESS = 'delete_keypair_success';
export const SET_VIEW_KEY = 'set_view_key';

export const getKeyPair = () => {
    return (dispatch) => {
        dispatch(getKeyPairRequest());

        return getKeyPairAsync().then(function (keyPair) {
            if (keyPair) {
                dispatch(getKeyPairSuccess(keyPair));
            } else {
                dispatch(createKeyPair());
            }
        }).catch(function (error) {
            dispatch(getKeyPairFailure(error));
        });
    }
}

export const createKeyPair = () => {
    return (dispatch) => {
        dispatch(createKeyPairRequest());

        return createKeyPairAsync().then(function (keyPair) {
            dispatch(createKeyPairSuccess(keyPair));
        }).catch(function (error) {
            dispatch(createKeyPairFailure(error));
        });
    }
}

export const deleteKeyPair = () => {
    return (dispatch) => {
        dispatch(deleteKeyPairRequest());

        return deleteKeyPairAsync().then(function () {
            dispatch(deleteKeyPairSuccess());
        }).catch(function (error) {
            dispatch(deleteKeyPairFailure(error));
        });
    }
}

const getKeyPairAsync = async () => {
    const publicKey = await Storage.get(PUBLIC_KEY);
    const privateKey = await Storage.get(PRIVATE_KEY);
    if (publicKey === null || privateKey === null)
        return undefined;
    return {
        publicKey: publicKey,
        privateKey: privateKey,
    };
}

const createKeyPairAsync = () => {
    return new Promise(async function (resolve) {
        Cryptography.generateKeyPair().then(async function (keyPair) {
            Storage.set(PUBLIC_KEY, keyPair.publicKey);
            Storage.set(PRIVATE_KEY, keyPair.privateKey);
            resolve({
                publicKey: keyPair.publicKey,
                privateKey: keyPair.privateKey,
            });
        });
    });
}

const deleteKeyPairAsync = async () => {
    await Storage.remove(PUBLIC_KEY);
    await Storage.remove(PRIVATE_KEY);
}

const getKeyPairRequest = () => {
    return {
        type: GET_KEYPAIR_REQUEST
    }
}

const getKeyPairFailure = (error) => {
    return {
        type: GET_KEYPAIR_FAILURE,
        payload: {
            error
        }
    }
}

const getKeyPairSuccess = (keyPair) => {
    return {
        type: GET_KEYPAIR_SUCCESS,
        payload: {
            ...keyPair
        }
    }
}

const createKeyPairRequest = () => {
    return {
        type: CREATE_KEYPAIR_REQUEST
    }
}

const createKeyPairFailure = (error) => {
    return {
        type: CREATE_KEYPAIR_FAILURE,
        payload: {
            error
        }
    }
}

const createKeyPairSuccess = (keyPair) => {
    return {
        type: GET_KEYPAIR_SUCCESS,
        payload: {
            ...keyPair
        }
    }
}

const deleteKeyPairRequest = () => {
    return {
        type: DELETE_KEYPAIR_REQUEST
    }
}

const deleteKeyPairFailure = (error) => {
    return {
        type: DELETE_KEYPAIR_FAILURE,
        payload: {
            error
        }
    }
}

const deleteKeyPairSuccess = () => {
    return {
        type: DELETE_KEYPAIR_SUCCESS
    }
}

/**
 * Function that sets the value to show or not the key to the user.
 * @param value FALSE / TRUE to show the key.
 * @returns {{type: string, payload: *}}
 */
export const setViewKey = (value) => {
    return {
        type: SET_VIEW_KEY,
        payload: value
    }
}