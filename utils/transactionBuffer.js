import { toBuffer } from 'base64url';

export function transactionToBuffer(transaction) {
    let buffer = Array.from(Buffer.from(transaction.id));
    buffer = buffer.concat(longToByteArray(transaction.timestamp));
    if (transaction.publicKeyInput !== null){
        buffer = buffer.concat(Array.from(toBuffer(transaction.publicKeyInput)));
    }
    buffer = buffer.concat(Array.from(toBuffer(transaction.publicKeyOutput)));
    let uint8Array = new Uint8Array(buffer);
    return uint8Array;
}

function longToByteArray(long) {
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var index = 0; index < byteArray.length; index++) {
        var byte = long & 0xff;
        byteArray[index] = byte;
        long = (long - byte) / 256;
    }
    return byteArray;
}