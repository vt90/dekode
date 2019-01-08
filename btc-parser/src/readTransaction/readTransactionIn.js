import {readSync, NEGATIVE_INDEX, COIN_BASE_TRANSACTION_HASH} from '../misc';
import {compose} from 'conductor';
import readInteger from "../readInteger";

const readTransactionPreviousHash = ([fd, position, result]) => {
    const [prevTxHash, nextPosition] = readSync(fd, 32, position);
    result.prevHash = prevTxHash;
    return [fd, nextPosition, result];
};

const readTransactionOutIndex = ([fd, position, result]) => {
    const [prevTxOutIndex, nextPosition] = readSync(fd, 4, position);
    if (prevTxOutIndex === NEGATIVE_INDEX && result.prevHash === COIN_BASE_TRANSACTION_HASH) {
        result.prevTxIndex = -1;
    } else {
        result.prevTxIndex = parseInt(prevTxOutIndex, 16);
    }
    return [fd, nextPosition, result];
};

const readTransactionInScriptLength = ([fd, position, result]) => {
    const [transactionInScriptLength, nextPosition] = readInteger(fd, position);
    result.scriptLength = transactionInScriptLength;
    return [fd, nextPosition, result];
};

const readTransactionInScript = ([fd, position, result]) => {
    const [transactionInScript, nextPosition, , rawScript] = readSync(fd, result.scriptLength, position);
    result.script = transactionInScript;
    //TODO: ADD RAW SCRIPT
    // result.rawScript = rawScript;
    return [fd, nextPosition, result];
};

const readEndSequence = ([fd, position, result]) => {
    const [endSequence, nextPosition] = readSync(fd, 4, position);
    console.log(`end sequence `, endSequence === 'FFFFFFFF'.toLowerCase());
    result.endSequence = endSequence;
    return [fd, nextPosition, result];
};

export default (fd, position) => compose(
    readEndSequence,
    readTransactionInScript,
    readTransactionInScriptLength,
    readTransactionOutIndex,
    readTransactionPreviousHash,
)([fd, position, {}]);
//         {
//             prevHash,
//             prevTxIndex,
//             scriptLength,
//             script,
//             endSequence,
//         }
