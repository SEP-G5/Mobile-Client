import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import * as Random from 'expo-random';
import { eddsa } from 'elliptic';

export const PUBLIC_KEY = 'PUBLIC_KEY';
export const PRIVATE_KEY = 'PRIVATE_KEY';

class Cryptography {

    static generateKeyPair() {
        return new Promise(async function (resolve) {
            const randomBytes = await Random.getRandomBytesAsync(32);
            const ec = new eddsa('ed25519');
            const keys = ec.keyFromSecret(randomBytes);
            resolve({
                publicKey: keys.getPublic('hex'),
                privateKey:keys.getSecret('hex')
            });

        });
    }

    static sign(privateKey, data) {
        return new Promise(async function (resolve) {
            const ec = new eddsa('ed25519');
            const key = ec.keyFromSecret('hex');
            const hash = Cryptography.getDataHash(data);
            const signature = key.sign(hash).toHex();
            resolve(signature);
        });
    }

    static verify(publicKey, signature, data) {
        return new Promise(async function (resolve) {
            const ec = new eddsa('ed25519');
            const key = ec.keyFromPublic(publicKey, 'hex');
            const hash = Cryptography.getDataHash(data);
            const valid = key.verify(hash, signature);
            resolve(valid);
        });
    }

    static getDataHash(data) {
        return sha256(JSON.stringify(data)).toString(CryptoJS.enc.hex);
    }

}

export { Cryptography };