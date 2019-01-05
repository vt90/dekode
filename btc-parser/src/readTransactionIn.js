// import readInteger from './readInteger';
import readSync from './readSync';
import {compose} from 'conductor';
import readInteger from "./readInteger";

const NEGATIVE_INDEX = 'ffffffff';
const COIN_BASE_TRANSACTION_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

const readTransactionPreviousHash = ({fd, transaction, position}) => {
    const [prevTxHash, nextPosition] = readSync(fd, 32, position);
    transaction.prevHash = prevTxHash;
    return {fd, position: nextPosition, transaction};
};

const readTransactionOutIndex = ({fd, transaction, position}) => {
    const [prevTxOutIndex, nextPosition] = readSync(fd, 4, position);
    if (prevTxOutIndex === NEGATIVE_INDEX && transaction.prevHash === COIN_BASE_TRANSACTION_HASH) {
        transaction.prevTxInex = -1;
    } else {
        transaction.prevTxInex = parseInt(prevTxOutIndex, 16);
    }
    return {fd, position: nextPosition, transaction};
};

const readTransactionInScriptLength = ({fd, transaction, position}) => {
    const [transactionInScriptLength, nextPosition] = readInteger(fd, position);
    transaction.scriptLength = transactionInScriptLength;
    return {fd, position: nextPosition, transaction};
};

const readTransactionInScript = ({fd, transaction, position}) => {
    const [transactionInScript, nextPosition] = readSync(fd, transaction.scriptLength, position);
    transaction.script = transactionInScript;
    return {fd, position: nextPosition, transaction};
};

const readEndSequence = ({fd, transaction, position}) => {
    const [endSequence, nextPosition] = readSync(fd, 4, position);
    console.log(`end sequence `, endSequence === 'FFFFFFFF'.toLowerCase());
    transaction.endSequence = endSequence;
    return {fd, position: nextPosition, transaction};
};
export default (fd, position) => compose(
    readEndSequence,
    readTransactionInScript,
    readTransactionInScriptLength,
    readTransactionOutIndex,
    readTransactionPreviousHash,
)({fd, position, transaction: {}});
