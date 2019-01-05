import fs from 'fs';
import readHeader from './readHeader'
import readTransactionHeader from './readTransactionHeader'
import readTransactionIn from './readTransactionIn';
import readTransactionOut from './readTransactionOut';
import readInteger from './readInteger';
import readSync from './readSync';

const getPath = blk => `E:\\bitcoin\\${blk}.dat`;

const fd = fs.openSync(getPath('blk00000'), 'r+');

/*
const blockHeader = readHeader(fd);
const transactionHeader = readTransactionHeader(fd, blockHeader.position);
const [transactionInCount, transactionInCountPosition] = readInteger(fd, transactionHeader.position);
const transactionIn = readTransactionIn(fd, transactionInCountPosition);
const [transactionOutCount, transactionOutCountPosition] = readInteger(fd, transactionIn.position);
const transactionOut = readTransactionOut(fd, transactionOutCountPosition);
console.log(blockHeader);
console.log(transactionHeader);
console.log(`transactionIn count : `, transactionInCount);
console.log(transactionIn);
console.log(`transactionOut count : `, transactionOutCount);
console.log(transactionOut);
const height = readSync(fd, 4, transactionOut.position);
console.log(height);
*/

const readTransaction = (fd, position) => {
    const result = {
        transactionsIn: [],
        transactionsOut: [],
    };
    const [transactionInCount, transactionInCountPosition] = readInteger(fd, position);
    let pos = transactionInCountPosition;
    while (result.transactionsIn.length < transactionInCount) {
        const transactionIn = readTransactionIn(fd, pos);
        pos = transactionIn.position;
        result.transactionsIn.push(transactionIn.transaction);
    }
    const [transactionOutCount, transactionOutCountPosition] = readInteger(fd, pos);
    pos = transactionOutCountPosition;
    while (result.transactionsOut.length < transactionOutCount) {
        const transactionOut = readTransactionOut(fd, pos);
        pos = transactionOut.position;
        result.transactionsOut.push(transactionOut.transaction);
    }
    return {result, pos};
};

const readBlock = (fd, position) => {
    const result = {
        transactions: [],
    };
    const blockHeader = readHeader(fd, position);
    result.blockHeader = blockHeader.blockHeader;
    const transactionHeader = readTransactionHeader(fd, blockHeader.position);
    result.transactionHeader = transactionHeader.transactionBlock;
    let pos = transactionHeader.position;
    while (result.transactions.length < transactionHeader.transactionBlock.count) {
        const {result: transaction, pos: nextTransactionPosition} = readTransaction(fd, transactionHeader.position);
        result.transactions.push(transaction);
        pos = nextTransactionPosition;
    }
    const [height, nextBlockPosition] = readSync(fd, 4, pos);
    result.height = height;
    return {block: result, position: nextBlockPosition};
};

let pos = 0;
let finalResult = undefined;
let x = 0;
try {
    while (true) {
        console.log(` start reading at pos`, pos);
        const {block, position} = readBlock(fd, pos);
        pos = position;
        finalResult = block;
        // const writeElement = JSON.stringify(block, null, 2);
        // fs.writeFile(`${block.blockHeader.prevBlockHash}`, writeElement, {flag: 'w'}, (err) => {
        //     if (err) {
        //         console.log(`failed to create file for block `, writeElement)
        //     }
        //     console.log(`create file for block `, writeElement)
        // });
        ++x;
    }
} catch (e) {
    //ignore
}

console.log(JSON.stringify(finalResult, null, 2));
console.log(`stopped at block `, x, pos);

fs.closeSync(fd);
