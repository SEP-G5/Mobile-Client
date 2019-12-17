import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
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
                publicKey: Base64.stringify(keys.getPublic()),
                privateKey: Base64.stringify(keys.getSecret())
            });

        });
    }

    static sign(privateKey, data) {
        return new Promise(async function (resolve) {
            const ec = new eddsa('ed25519');
            const key = ec.keyFromSecret(CryptoJS.enc.Base64.parse(privateKey));
            const hash = Cryptography.getDataHash(data);
            const signature = key.sign(hash).toBytes();
            resolve(Base64.stringify(CryptoJS.enc.Utf8.parse(signature)));
        });
    }

    static verify(publicKey, signature, data) {
        return new Promise(async function (resolve) {
            const ec = new eddsa('ed25519');
            const key = ec.keyFromPublic(publicKey);
            const hash = Cryptography.getDataHash(data);
            const valid = key.verify(hash, signature);
            resolve(valid);
        });
    }

    static getDataHash(data) {
        return sha256(JSON.stringify(data)).toString(CryptoJS.enc.Base64);
    }

}

export { Cryptography };