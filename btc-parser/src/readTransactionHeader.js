import readInteger from './readInteger';
import readSync from './readSync';
import {compose} from 'conductor';

const TRANSACTION_FLAG = "0001";

export const readTransactionCount = ({fd, transactionBlock, position}) => {
    const [txCount, nextPosition] = readInteger(fd, position);
    transactionBlock.count = txCount;
    return {fd, position: nextPosition, transactionBlock};
};

const readTransactionVersion = ({fd, transactionBlock, position}) => {
    const [transactionVersion, nextPosition] = readSync(fd, 4, position);
    transactionBlock.version = parseInt(transactionVersion, 16);
    return {fd, position: nextPosition, transactionBlock};
};

const readTransactionFlag = ({fd, transactionBlock, position}) => {
    const [transactionFlag, nextPosition] = readSync(fd, 2, position);
    if (transactionFlag.toLowerCase() === TRANSACTION_FLAG) {
        transactionBlock.hasWitness = true;
        return ({fd, transactionBlock, position: nextPosition});
    }
    transactionBlock.hasWitness = false;
    return ({fd, transactionBlock, position});
};

// const readTransactionsInCount = ({fd, transactionBlock, position}) => {
//     const [transactionsInCount, nextPosition] = readInteger(fd, position);
//     transactionBlock.transactionsInCount = transactionsInCount;
//     return ({fd, position: nextPosition, transactionBlock});
// };

const returnValues = ({transactionBlock, position}) => ({transactionBlock, position});

export default (fd, position) => compose(
    returnValues,
    // readTransactionsInCount,
    // readTransactionFlag,
    readTransactionVersion,
    readTransactionCount,
)({fd, transactionBlock: {}, position})
