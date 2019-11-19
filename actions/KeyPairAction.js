import { JSEncrypt } from 'jsencrypt'
import { AsyncStorage } from 'react-native';

export const GET_KEYPAIR_REQUEST = 'get_keypair_request';
export const GET_KEYPAIR_FAILURE = 'get_keypair_failure';
export const GET_KEYPAIR_SUCCESS = 'get_keypair_success';
export const CREATE_KEYPAIR_REQUEST = 'create_keypair_request';
export const CREATE_KEYPAIR_FAILURE = 'create_keypair_failure';
export const CREATE_KEYPAIR_SUCCESS = 'create_keypair_success';
export const DELETE_KEYPAIR_REQUEST = 'delete_keypair_request';
export const DELETE_KEYPAIR_FAILURE = 'delete_keypair_failure';
export const DELETE_KEYPAIR_SUCCESS = 'delete_keypair_success';

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
    const publicKey = await AsyncStorage.getItem('PUBLIC_KEY');
    const privateKey = await AsyncStorage.getItem('PRIVATE_KEY');
    if (publicKey === null || privateKey === null)
        return undefined;
    return {
        publicKey: publicKey,
        privateKey: privateKey,
    };
}

const createKeyPairAsync = () => {
    return new Promise(async function (resolve) {
        var crypt = new JSEncrypt({ default_key_size: 2048 });

        crypt.getKey(async function () {
            const keyPair = {
                publicKey: crypt.getPublicKey(),
                privateKey: crypt.getPrivateKey(),
            };

            await AsyncStorage.setItem('PUBLIC_KEY', keyPair.publicKey);
            await AsyncStorage.setItem('PRIVATE_KEY', keyPair.privateKey);

            resolve(keyPair);
        });
    });
}

const deleteKeyPairAsync = async () => {
    await AsyncStorage.removeItem('PUBLIC_KEY');
    await AsyncStorage.removeItem('PRIVATE_KEY');
}

const getKeyPairRequest = () => {
    return {
        type: GET_KEYPAIR_REQUEST
    }
}

const getKeyPairFailure = (error) => {
    return {
        type: GET_KEYPAIR_FAILURE
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
        type: CREATE_KEYPAIR_FAILURE
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
        type: DELETE_KEYPAIR_FAILURE
    }
}

const deleteKeyPairSuccess = () => {
    return {
        type: DELETE_KEYPAIR_SUCCESS
    }
}