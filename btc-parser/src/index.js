// import fs from 'fs';
// import readBlock from './readBlock';
//
// const getPath = blk => `E:\\bitcoin\\${blk}.dat`;
// const fd = fs.openSync(getPath('blk00001'), 'r+');
//
// let index = 0;
// let pos = 0;
// let block = null;
// try {
//     while (true) {
//         const [readedBlock, position] = readBlock(fd, pos);
//         pos = position;
//         block = readedBlock;
//         ++index;
//     }
//
// } catch (e) {
//     console.error(e);
// }
//
// console.log(pos, index);
// console.log('\n');
// console.log(JSON.stringify(block, null, 2));
// console.log('\n');

// import BtcClient from 'bitcoin-core';
//
// const client = new BtcClient({
//     username: '__cookie__',
//     password: 'dfbc8a287eddeeaf3860c2932caee1cb2d4f4e76d8fa4da2dd69ce7f9ad885e9',
//     version: '0.17.1'
// });
//
// client.getBlockHash(0).then((help) => console.log(` then `, help)).catch(error => console.log(` catch `, error));
//
// console.log('hey hello world');

class Parser {

    constructor(buff) {
        this.buff = buff;
        this.currentPosition = 0;
        this.readVersion();
        this.readPrevBlockHash();
        this.readMerkleRoot();
        this.readTimeStamp();
        this.readDifficulty();
        this.readNonce();
        this.readTxCount();
        this.transactions = [];
        this.readTxs(this.txCount);
    }

    readVersion() {
        this.version = this.buff.readInt32LE(this.currentPosition);
        this.currentPosition += 4;
    }

    readPrevBlockHash() {
        this.prevBlockHash = this.buff.slice(this.currentPosition, this.currentPosition + 32).toString('hex');
        this.currentPosition += 32;
    }

    readMerkleRoot() {
        this.merkleRoot = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 32).toString('hex'));
        this.currentPosition += 32;
    }

    readTimeStamp() {
        this.timeStamp = this.buff.readUInt32LE(this.currentPosition);
        this.date = new Date(this.timeStamp * 1000).toISOString();
        this.currentPosition += 4;
    }

    readDifficulty() {
        this.bits = this.buff.readUInt32LE(this.currentPosition);
        this.currentPosition += 4;
    }

    readNonce() {
        this.nonce = this.buff.readInt32LE(this.currentPosition);
        this.currentPosition += 4;
    }

    readTxCount() {
        this.txCount = this.readVi();
    }

    readTxs(txs) {
        for (let i = 0; i < txs; ++i) {
            const version = this.readTxVersion();
            const txFlag = this.readTxFlag();
            if (txFlag) {
                this.currentPosition += 2;
            }
            const txInCount = this.readTxInCount();
            const txIn = this.readTxIn(txInCount);
            const txOutCount = this.readTxOutCount();
            const txOut = this.readTxOut(txOutCount);
            if (txFlag) {
                throw new Error('this transaction has flag');
            }
            const lockTime = this.readLockTime();
            // this.readTxIn();
            //TODO: Rethink this;
            this.transactions.push({
                version,
                txIn,
                txOut,
                lockTime,
                txFlag,
            })
        }
    }

    readTxVersion() {
        const txVersion = this.buff.readInt32LE(this.currentPosition);
        this.currentPosition += 4;
        return txVersion;
    }

    readTxFlag() {
        const marker = this.buff.slice(this.currentPosition, this.currentPosition + 1).toString('hex');
        const flag = this.buff.slice(this.currentPosition + 1, this.currentPosition + 2).toString('hex');
        return marker === '00' && flag === '01';
    }

    readTxInCount() {
        return this.readVi();
    }


    readTxIn(txInCount) {
        const txIn = [];
        for (let i = 0; i < txInCount; ++i) {
            const prevTxInHash = this.readPrevTxInHash();
            let prevTxOutIndex = this.readPrevTxOutIndex();
            if (prevTxInHash === '0000000000000000000000000000000000000000000000000000000000000000') {
                prevTxOutIndex = -1;
            }
            const txInScriptLength = this.readTxInScriptLength();
            const txInScript = this.readTxInScript(txInScriptLength);
            const txInSequenceNumber = this.readTxInSequenceNumber();

            txIn.push({
                prevTxInHash,
                prevTxOutIndex,
                txInScriptLength,
                txInScript,
                txInSequenceNumber
            })

        }
        return txIn;
    }

    readPrevTxInHash() {
        const prevTxHash = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 32).toString('hex'));
        this.currentPosition += 32;
        return prevTxHash;
    }

    readPrevTxOutIndex() {
        const prevTxOutIndex = this.buff.readUInt32LE(this.currentPosition);
        this.currentPosition += 4;
        return prevTxOutIndex;
    }

    readTxInScriptLength() {
        return this.readVi();
    }

    readTxInScript(length) {
        const txInScript = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + length).toString('hex'));
        this.currentPosition += length;
        return txInScript;
    }

    readTxInSequenceNumber() {
        const txInSequenceNumber = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 4).toString('hex'));
        this.currentPosition += 4;
        console.log(txInSequenceNumber === 'ffffffff');
        return txInSequenceNumber;
    }

    readTxOutCount() {
        return this.readVi();
    }

    readTxOut(txOutCount) {
        const txOut = [];
        for (let i = 0; i < txOutCount; ++i) {
            const value = this.readTxOutValue();
            const scriptLength = this.readTxOutScriptLength();
            const script = this.readTxOutScript(scriptLength);
            txOut.push({
                value,
                script,
            });
        }
        return txOut;
    }

    readTxOutValue() {
        const rawData = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 8).toString());
        const value = parseInt(rawData, 16);
        this.currentPosition += 8;
        return value;
    }

    readTxOutScriptLength() {
        return this.readVi();
    }

    readTxOutScript(length) {
        const txOuScript = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + length).toString('hex'));
        this.currentPosition += length;
        return txOuScript;
    }

    readLockTime() {
        const rawData = this.buff.slice(this.currentPosition, this.currentPosition + 4).toString('hex');
        this.currentPosition += 4;
        return Parser.endianness(rawData);
    }

    static endianness(string) {
        const result = [];
        let len = string.length - 2;
        while (len >= 0) {
            result.push(string.substr(len, 2));
            len -= 2;
        }
        return result.join('');
    }

    readVi() {
        const size = this.buff.readUInt8(this.currentPosition);
        this.currentPosition += 1;
        switch (size) {
            case 253:
                let number = this.buff.readUInt16LE(this.currentPosition);
                this.currentPosition += 2;
                return number;
            case 254:
                number = this.buff.readUInt32LE(this.currentPosition);
                this.currentPosition += 4;
                return number;
            case 255:
                const rawData = this.buff.slice(this.currentPosition, this.currentPosition + 8).toString();
                const rawNumber = Parser.endianness(rawData);
                number = parseInt(rawNumber, 16);
                this.currentPosition += 8;
                return number;

            default:
                return size;
        }
    }

}

const data = '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
const parser = new Parser(Buffer.alloc(data.length, data, 'hex'));
const buffSize = parser.buff.slice(0, parser.buff.length).toString('hex').length;
console.log(buffSize, 4 * parser.currentPosition);
delete parser.buff;
console.log(JSON.stringify(parser, null, 2));
// console.log(parser);
