import readInteger from '../readInteger';
import readTransactionIn from './readTransactionIn';
import readTransactionOut from './readTransactionOut';
import {compose} from 'conductor';

const readAllTransactionsIn = ([fd, position, result]) => {
    const [transactionsInCount, nextPosition] = readInteger(fd, position);
    result.transactionsInCount = transactionsInCount;
    result.transactionsIn = [];
    let pos = nextPosition;
    while (result.transactionsIn.length < transactionsInCount) {
        const [, nextPos, transactionIn] = readTransactionIn(fd, pos);
        pos = nextPos;
        result.transactionsIn.push(transactionIn);
    }
    return [fd, pos, result];
};

const readAllTransactionsOut = ([fd, position, result]) => {
    const [transactionsOutCount, nextPosition] = readInteger(fd, position);
    result.transactionsOutCount = transactionsOutCount;
    result.transactionsOut = [];
    let pos = nextPosition;
    while (result.transactionsOut.length < transactionsOutCount) {
        const [, nextPos, transactionOut] = readTransactionOut(fd, pos);
        pos = nextPos;
        result.transactionsOut.push(transactionOut);
    }
    return [fd, pos, result];
};

export default (fd, position) => compose(
    readAllTransactionsOut,
    readAllTransactionsIn,
)([fd, position, {}]);
// transactions:[
//     {
//         transactionsInCount,
//             transactionsIn:[
//         {
//             prevHash,
//             prevTxIndex,
//             scriptLength,
//             script,
//             endSequence,
//         }
//     ],
//         transactionsOutCount,
//         transactionsOut:[
//         {
//             value,
//             rawValue,
//             scriptLength,
//             script,
//         }
//     ]
//     }
//     ]
