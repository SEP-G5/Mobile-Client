import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import * as Random from 'expo-random';
import { eddsa } from 'elliptic';
import { encode, toBuffer } from 'base64url';

export const PUBLIC_KEY = 'PUBLIC_KEY';
export const PRIVATE_KEY = 'PRIVATE_KEY';

class Cryptography {

    static generateKeyPair() {
        return new Promise(async function (resolve) {
            const randomBytes = await Random.getRandomBytesAsync(32);
            const ec = new eddsa('ed25519');
            const keys = ec.keyFromSecret(randomBytes);
            resolve({
                publicKey: encode(keys.getPublic()),
                privateKey: encode(keys.getSecret())
            });
        });
    }

    static sign(privateKey, data) {
        return new Promise(async function (resolve) {
            const ec = new eddsa('ed25519');
            privateKey = toBuffer(privateKey);
            const key = ec.keyFromSecret(privateKey);
            const hash = Cryptography.getDataHash(data);
            const signature = encode(key.sign(hash).toBytes());
            resolve(signature);
        });
    }

    static verify(publicKey, signature, data) {
        return new Promise(async function (resolve) {
            const ec = new eddsa('ed25519');
            publicKey = Array.from(toBuffer(publicKey));
            signature = Array.from(toBuffer(signature));
            const key = ec.keyFromPublic(publicKey);
            const hash = Cryptography.getDataHash(data);
            const valid = key.verify(hash, signature);
            resolve(valid);
        });
    }

    static getDataHash(data) {
        return sha256(JSON.stringify(data)).toString();
    }

}

export { Cryptography };