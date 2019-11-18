import { JSEncrypt } from 'jsencrypt'

export const GET_KEYPAIR = 'get_keypair';

export const getKeyPair = () => {
    if (keyPairExists() === false)
        return createKeyPair();

    return (dispatch) => {

        const keyPair = {
            publicKey: "",
            privateKey: "",
        };

        dispatch(getKeyPairSuccess(keyPair));
    }
}

const keyPairExists = () => {
    return false;
}

const createKeyPair = () => {
    return (dispatch) => {
        var crypt = new JSEncrypt({ default_key_size: 2048 });

        const keyPair = {
            publicKey: crypt.getPublicKey(),
            privateKey: crypt.getPrivateKey(),
        };

        dispatch(getKeyPairSuccess(keyPair));
    }
}

const getKeyPairSuccess = (keyPair) => {
    return {
        type: GET_KEYPAIR,
        payload: {
            ...keyPair
        }
    }
}