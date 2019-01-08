import fs from "fs";

export const MAGIC_NUMBER = 'd9b4bef9';
export const HAS_WITNESS_FLAG = '0001';
export const NEGATIVE_INDEX = 'ffffffff';
export const COIN_BASE_TRANSACTION_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

export function endianness(string) {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
        result.push(string.substr(len, 2));
        len -= 2;
    }
    return result.join('');
}

export function readSync(fd, length, position) {
    console.time('readSync');
    const buffer = Buffer.alloc(length);
    const read = fs.readSync(fd, buffer, 0, length, position);
    console.log(` read length : `, read, ' position : ', position, " result ", buffer.toString('hex'));
    const result = endianness(buffer.toString('hex'));
    console.timeEnd('readSync');
    // if (read === 0) {
    //     //TODO BOGDAN : add EOF exception
    //     throw new Error('End of File');
    // }
    return [
        result,
        position + read,
        read,
    ];
}
