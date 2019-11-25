import { JSEncrypt } from 'jsencrypt'
import sha256 from 'crypto-js/sha256';

const KEY_SIZE = 2048;
export const PUBLIC_KEY = 'PUBLIC_KEY';
export const PRIVATE_KEY = 'PRIVATE_KEY';

class Cryptography {

    static generateKeyPair() {
        return new Promise(async function (resolve) {
            var crypt = new JSEncrypt({ default_key_size: KEY_SIZE });

            crypt.getKey(async function () {
                const keyPair = {
                    publicKey: crypt.getPublicKey(),
                    privateKey: crypt.getPrivateKey(),
                };

                resolve(keyPair);
            });
        });
    }

    static sign(privateKey, data) {
        return new Promise(async function (resolve) {
            var crypt = new JSEncrypt();
            crypt.setKey(privateKey);
            var signature = crypt.sign(data, sha256);
            resolve(signature);
        });
    }

    static verify(publicKey, signature, data) {
        return new Promise(async function (resolve) {
            var crypt = new JSEncrypt();
            crypt.setKey(publicKey);
            resolve(crypt.verify(data, signature, sha256));
        });
    }

}

export { Cryptography };