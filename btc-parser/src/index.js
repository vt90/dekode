import BtcClient from 'bitcoin-core';
import crypto from 'crypto';

// import fs from 'fs';

class Parser {

    constructor(buff, client) {
        this.client = client;
        this.buff = buff;
        this.currentPosition = 0;
        this.txStartPosition = 0;
        this.transactions = [];
    }

    async run() {
        this.readVersion();
        this.readPrevBlockHash();
        this.readMerkleRoot();
        this.readTimeStamp();
        this.readDifficulty();
        this.readNonce();
        this.readTxCount();
        await this.readTxs(this.txCount); // this.readTxs(1);
    }

    readVersion() {
        this.version = this.buff.readInt32LE(this.currentPosition);
        this.currentPosition += 4;
    }

    readPrevBlockHash() {
        this.prevBlockHash = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 32).toString('hex'));
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

    async readTxs(txs) {
        for (let i = 0; i < txs; ++i) {
            this.txStartPosition = this.currentPosition;
            const version = this.readTxVersion();
            const txFlag = this.readTxFlag();

            if (txFlag) {
                this.currentPosition += 2;
            }

            const txInCount = this.readTxInCount();
            const txIn = this.readTxIn(txInCount);
            const txOutCount = this.readTxOutCount();
            const txOut = await this.readTxOut(txOutCount);
            const witnesses = [];

            if (txFlag) {
                witnesses.push(...this.readWitnesses(txInCount));
            }

            const lockTime = this.readLockTime(); // this.readTxIn();

            let rawTx = this.buff.slice(this.txStartPosition, this.currentPosition);
            const txHash = Parser.txHash(rawTx);

            this.transactions.push({
                txHash,
                version,
                txIn,
                txOut,
                lockTime,
                txFlag,
                witnesses
            });
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
            });
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
        const txInScript = this.buff.slice(this.currentPosition, this.currentPosition + length).toString('hex');
        this.currentPosition += length;
        return txInScript;
    }

    readTxInSequenceNumber() {
        const txInSequenceNumber = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 4).toString('hex'));
        this.currentPosition += 4; // console.log(txInSequenceNumber === 'ffffffff');

        return txInSequenceNumber;
    }

    readTxOutCount() {
        return this.readVi();
    }

    async readTxOut(txOutCount) {
        const txOut = [];

        for (let i = 0; i < txOutCount; ++i) {
            const value = this.readTxOutValue();
            const scriptLength = this.readTxOutScriptLength();
            const script = await this.readTxOutScript(scriptLength);
            txOut.push({
                value,
                script
            });
        }

        return txOut;
    }

    readTxOutValue() {
        const rawData = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 8).toString('hex'));
        const value = parseInt(rawData, 16);
        this.currentPosition += 8;
        return value;
    }

    readTxOutScriptLength() {
        return this.readVi();
    }

    async readTxOutScript(length) {
        const txOuScript = this.buff.slice(this.currentPosition, this.currentPosition + length).toString('hex');
        this.currentPosition += length;
        const decodedScript = await this.decodeTxOutScript(txOuScript);
        return {
            script: txOuScript,
            ...decodedScript
        };
    }

    readWitnesses(witnessCount) {
        const witnesses = [];

        for (let i = 0; i < witnessCount; ++i) {
            const witness = this.readWitness();
            witnesses.push(witness);
        }

        return witnesses;
    }

    readWitness() {
        const stackItems = this.readVi();
        let witness = '';
        for (let i = 0; i < stackItems; ++i) {
            const witnessLength = this.readVi();
            const rawWitness = this.buff.slice(this.currentPosition, this.currentPosition + witnessLength).toString('hex');
            witness += rawWitness;
            this.currentPosition += witnessLength;
        }

        return witness;
    }

    readLockTime() {
        const rawData = this.buff.slice(this.currentPosition, this.currentPosition + 4).toString('hex');
        this.currentPosition += 4;
        return Parser.endianness(rawData);
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
                const rawData = this.buff.slice(this.currentPosition, this.currentPosition + 8).toString('hex');
                const rawNumber = Parser.endianness(rawData);
                number = parseInt(rawNumber, 16);
                this.currentPosition += 8;
                return number;

            default:
                return size;
        }
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

    static txHash(buffer) {
        const firstHash = crypto.createHash('sha256').update(buffer).digest();
        const txHash = crypto.createHash('sha256').update(firstHash).digest();
        return Parser.endianness(txHash.toString('hex'));
    }

    async decodeTxOutScript(script) {
        return await this.client.decodeScript(script);
        // return {}
    }

}

async function main() {
    let parser = null;
    try {
        const client = new BtcClient({
            username: '__cookie__',
            password: 'ff2ad0505ccebd59305c55bcfc3f8cec8fa63f563f99765ac14ad9c46f839b50',
            version: '0.17.1'
        });
        const blockCount = await client.getBlockCount();
        client.getTransactionByHash();
        // const blockCount = 500000;
        for (let i = blockCount - 50; i < blockCount; ++i) {
            console.log('get block at index ', i);
            const blockHash = await client.getBlockHash(i);
            console.log('block with index ', i, ' has hash', blockHash);
            const rawBlockData = await client.getBlock(blockHash, 0);
            parser = new Parser(Buffer.alloc(rawBlockData.length, rawBlockData, 'hex'), client);
            await parser.run();
            const buffSize = parser.buff.slice(0, parser.buff.length).toString('hex').length;
            if (buffSize !== 4 * parser.currentPosition) {
                throw new Error(`error at parsing block , ${i} , ${blockHash} `);
            }
            delete parser.client;
            delete parser.buff;
            delete parser.currentPosition;
        }
    } catch (e) {
        if (parser) {
            delete parser.client;
            delete parser.buff;
            delete parser.currentPosition;
            console.log(` error in main `, e, JSON.stringify(parser));
        }
        console.log(` error in main `, e);
    }
}

main();

/*
async function main() {
    let parser = null;
    try {
        const rawBlock = fs.readFileSync('E:/black/dekode/a.dat').toString();
        // const rawBlock = '0200000000010140d43a99926d43eb0e619bf0b3d83b4a31f60c176beecfb9d35bf45e54d0f7420100000017160014a4b4ca48de0b3fffc15404a1acdc8dbaae226955ffffffff0100e1f5050000000017a9144a1154d50b03292b3024370901711946cb7cccc387024830450221008604ef8f6d8afa892dee0f31259b6ce02dd70c545cfcfed8148179971876c54a022076d771d6e91bed212783c9b06e0de600fab2d518fad6f15a2b191d7fbd262a3e0121039d25ab79f41f75ceaf882411fd41fa670a4c672c23ffaf0e361a969cde0692e800000000';
        const block = Buffer.alloc(rawBlock.length, rawBlock, 'hex');
        parser = new Parser(block);
        await parser.run();
        // await parser.readTxs(1);
        // delete parser.buff;
        // delete parser.currentPosition;
        // delete parser.txStartPosition;
        // parser.transactions.forEach((t, index) => {
        //     if (index > 10) return;
        //     console.log(JSON.stringify(t, null, 2));
        // });
        // console.log(JSON.stringify(parser, null, 2));
    } catch (e) {
        console.log('this is bad ', e);
        // console.log('this is bad ', parser.transactions.length);
        // console.log('this is bad ', JSON.stringify(parser.transactions[12], null, 2));
        // console.log(parser);
        // console.log(JSON.stringify(parser.transactions[12], null, 2));
    }
}

main();

// const data = '000000201991f148bea2219958d04769224aff5651a5f590f1b50500000000000000000043f7d952375f4c82d45be5f73a8c2764f7c2a75231c9894ab34b17f6d4706d9faf4f485c33d62f1775420f4bfddf0801000000000';
// const buff = Buffer.alloc(data.length, data, 'hex');
// const parser = new Parser(buff);
// parser.readVersion();
// parser.readPrevBlockHash();
// console.log(parser.version, changeEndianness(parser.prevBlockHash));
//

// const rawBlock = fs.readFileSync('E:/black/dekode/a.dat').toString();
// const block = Buffer.alloc(rawBlock.length, rawBlock, 'hex');
// const parser = new Parser(block);
// parser.readVersion();
// parser.readPrevBlockHash();
// parser.readMerkleRoot();
// parser.readTimeStamp();
// parser.readDifficulty();
// parser.readNonce();
// parser.readTxCount();
// delete parser.buff;
// delete parser.client;
// console.log('block version ', parser);
*/
