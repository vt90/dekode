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
        // this.readTxs(1);
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
            const witnesses = [];
            if (txFlag) {
                witnesses.push(...this.readWitnesses());
                //     throw new Error('this transaction has flag');
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
                witnesses,
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
        const rawData = Parser.endianness(this.buff.slice(this.currentPosition, this.currentPosition + 8).toString('hex'));
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

    readWitnesses() {
        const witnessCount = this.buff.readUInt8(this.currentPosition);
        const witnesses = [];
        this.currentPosition += 1;
        console.log(` readWitness `, witnessCount);
        for (let i = 0; i < witnessCount; ++i) {
            const witness = this.readWitness();
            witnesses.push(witness);
        }
        return witnesses;
    }

    readWitness() {
        const scriptLength = this.buff.readUInt8(this.currentPosition);
        this.currentPosition += 1;
        const rawScript = this.buff.slice(this.currentPosition, this.currentPosition + scriptLength).toString('hex');
        this.currentPosition += scriptLength;
        return Parser.endianness(rawScript);
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
                const rawData = this.buff.slice(this.currentPosition, this.currentPosition + 8).toString('hex');
                const rawNumber = Parser.endianness(rawData);
                number = parseInt(rawNumber, 16);
                this.currentPosition += 8;
                return number;

            default:
                return size;
        }
    }

}

// const data = '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';
// const data = '0200000000010140d43a99926d43eb0e619bf0b3d83b4a31f60c176beecfb9d35bf45e54d0f7420100000017160014a4b4ca48de0b3fffc15404a1acdc8dbaae226955ffffffff0100e1f5050000000017a9144a1154d50b03292b3024370901711946cb7cccc387024830450221008604ef8f6d8afa892dee0f31259b6ce02dd70c545cfcfed8148179971876c54a022076d771d6e91bed212783c9b06e0de600fab2d518fad6f15a2b191d7fbd262a3e0121039d25ab79f41f75ceaf882411fd41fa670a4c672c23ffaf0e361a969cde0692e800000000';
const data = '0100000050120119172a610421a6c3011dd330d9df07b63616c2cc1f1cd00200000000006657a9252aacd5c0b2940996ecff952228c3067cc38d4885efb5a4ac4247e9f337221b4d4c86041b0f2b57100401000000010000000000000000000000000000000000000000000000000000000000000000ffffffff08044c86041b020602ffffffff0100f2052a010000004341041b0e8c2567c12536aa13357b79a073dc4444acb83c4ec7a0e2f99dd7457516c5817242da796924ca4e99947d087fedf9ce467cb9f7c6287078f801df276fdf84ac000000000100000001032e38e9c0a84c6046d687d10556dcacc41d275ec55fc00779ac88fdf357a187000000008c493046022100c352d3dd993a981beba4a63ad15c209275ca9470abfcd57da93b58e4eb5dce82022100840792bc1f456062819f15d33ee7055cf7b5ee1af1ebcc6028d9cdb1c3af7748014104f46db5e9d61a9dc27b8d64ad23e7383a4e6ca164593c2527c038c0857eb67ee8e825dca65046b82c9331586c82e0fd1f633f25f87c161bc6f8a630121df2b3d3ffffffff0200e32321000000001976a914c398efa9c392ba6013c5e04ee729755ef7f58b3288ac000fe208010000001976a914948c765a6914d43f2a7ac177da2c2f6b52de3d7c88ac000000000100000001c33ebff2a709f13d9f9a7569ab16a32786af7d7e2de09265e41c61d078294ecf010000008a4730440220032d30df5ee6f57fa46cddb5eb8d0d9fe8de6b342d27942ae90a3231e0ba333e02203deee8060fdc70230a7f5b4ad7d7bc3e628cbe219a886b84269eaeb81e26b4fe014104ae31c31bf91278d99b8377a35bbce5b27d9fff15456839e919453fc7b3f721f0ba403ff96c9deeb680e5fd341c0fc3a7b90da4631ee39560639db462e9cb850fffffffff0240420f00000000001976a914b0dcbf97eabf4404e31d952477ce822dadbe7e1088acc060d211000000001976a9146b1281eec25ab4e1e0793ff4e08ab1abb3409cd988ac0000000001000000010b6072b386d4a773235237f64c1126ac3b240c84b917a3909ba1c43ded5f51f4000000008c493046022100bb1ad26df930a51cce110cf44f7a48c3c561fd977500b1ae5d6b6fd13d0b3f4a022100c5b42951acedff14abba2736fd574bdb465f3e6f8da12e2c5303954aca7f78f3014104a7135bfe824c97ecc01ec7d7e336185c81e2aa2c41ab175407c09484ce9694b44953fcb751206564a9c24dd094d42fdbfdd5aad3e063ce6af4cfaaea4ea14fbbffffffff0140420f00000000001976a91439aa3d569e06a1d7926dc4be1193c99bf2eb9ee088ac00000000';
const parser = new Parser(Buffer.alloc(data.length, data, 'hex'));
const buffSize = parser.buff.slice(0, parser.buff.length).toString('hex').length;
console.log(buffSize, 4 * parser.currentPosition);
delete parser.buff;
console.log(JSON.stringify(parser, null, 2));
// console.log(parser);
