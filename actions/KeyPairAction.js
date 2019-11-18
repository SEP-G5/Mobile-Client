import { JSEncrypt } from 'jsencrypt'
import { AsyncStorage } from 'react-native';

export const GET_KEYPAIR_REQUEST = 'get_keypair_request';
export const GET_KEYPAIR_FAILURE = 'get_keypair_failure';
export const GET_KEYPAIR_SUCCESS = 'get_keypair_success';

export const getKeyPair = () => {
    return (dispatch) => {

        dispatch(getKeyPairRequest());

        getKeyPairAsync().then(function (keyPair) {
            if (keyPair) {
                dispatch(getKeyPairSuccess(keyPair));
            } else {
                createKeyPairAsync().then(function (keyPair) {
                    dispatch(getKeyPairSuccess(keyPair));
                });
            }
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

const createKeyPairAsync = async () => {
    var crypt = new JSEncrypt({ default_key_size: 2048 });

    const keyPair = {
        publicKey: crypt.getPublicKey(),
        privateKey: crypt.getPrivateKey(),
    };

    await AsyncStorage.setItem('PUBLIC_KEY', keyPair.publicKey);
    await AsyncStorage.setItem('PRIVATE_KEY', keyPair.privateKey);

    return keyPair;
}

const deleteKeyPair = () => {

}

const getKeyPairRequest = () => {
    return {
        type: GET_KEYPAIR_REQUEST
    }
}

const getKeyPairFailure = () => {
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