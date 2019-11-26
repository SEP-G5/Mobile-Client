import expect from 'expect'
import { Cryptography } from '../CryptographyService'

describe('CryptographyService', () => {

    var keyPair = {};
    const data = [
        "", [], {}, "Abc123",
        {
            te: "qwerty",
            st: "azerty"
        },
        [1123, 4654, 54, "we"]
    ];
    var signatures = [];

    it('should generate a keypair', async () => {
        jest.setTimeout(240000);
        keyPair = await Cryptography.generateKeyPair();
        expect(keyPair).toBeTruthy();
        expect(keyPair.publicKey).toBeTruthy()
        expect(keyPair.privateKey).toBeTruthy()
    });

    it('should sign the data', async () => {
        jest.setTimeout(240000);

        const privateKey = keyPair.privateKey;

        var signature = undefined;
        signature = await Cryptography.sign(privateKey, data[0]);
        expect(signature).toBeTruthy();
        signatures.push(signature);

        signature = undefined;
        signature = await Cryptography.sign(privateKey, data[1]);
        expect(signature).toBeTruthy();
        signatures.push(signature);

        signature = undefined;
        signature = await Cryptography.sign(privateKey, data[2]);
        expect(signature).toBeTruthy();
        signatures.push(signature);

        signature = undefined;
        signature = await Cryptography.sign(privateKey, data[3]);
        expect(signature).toBeTruthy();
        signatures.push(signature);

        signature = undefined;
        signature = await Cryptography.sign(privateKey, data[4]);
        expect(signature).toBeTruthy();
        signatures.push(signature);

        signature = undefined;
        signature = await Cryptography.sign(privateKey, data[5]);
        expect(signature).toBeTruthy();
        signatures.push(signature);
    });

    it('should verify the signed data', async () => {
        jest.setTimeout(240000);
        const publicKey = keyPair.publicKey;
        
        var verification = false;
        var verification = await Cryptography.verify(publicKey, signatures[0], data[0]);
        expect(verification).toBe(true);

        verification = false;
        var verification = await Cryptography.verify(publicKey, signatures[1], data[1]);
        expect(verification).toBe(true);

        verification = false;
        var verification = await Cryptography.verify(publicKey, signatures[2], data[2]);
        expect(verification).toBe(true);

        verification = false;
        var verification = await Cryptography.verify(publicKey, signatures[3], data[3]);
        expect(verification).toBe(true);

        verification = false;
        var verification = await Cryptography.verify(publicKey, signatures[4], data[4]);
        expect(verification).toBe(true);

        verification = false;
        var verification = await Cryptography.verify(publicKey, signatures[5], data[5]);
        expect(verification).toBe(true);
    });

});