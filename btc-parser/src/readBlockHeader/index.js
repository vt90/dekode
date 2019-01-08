/*
        header:{
            magicNumber,
            blockSize,
            blockVersion,
            prevBlockHash,
            merkleRoot,
            timeStamp,
            date,
            nBits,
            difficultyTarget,
            nonce,
            transactionsCount,
            version,
            hasWitness
        },
 */

import {compose} from 'conductor';
import readInteger from '../readInteger';
import {readSync, MAGIC_NUMBER, HAS_WITNESS_FLAG} from '../misc';

const readMagicNumber = ([fd, position, result]) => {
    const [magicNumber, nextPosition] = readSync(fd, 4, position);
    if (magicNumber.toLowerCase() !== MAGIC_NUMBER) {
        throw new Error('invalid block');
    }
    result.magicNumber = magicNumber;
    console.log(` readMagicNumber `, magicNumber);
    return [fd, nextPosition, result];
};

const readBlockSize = ([fd, position, result]) => {
    const [blockSize, nextPosition] = readSync(fd, 4, position);
    result.blockSize = parseInt(blockSize, 16);
    console.log(` readBlockSize `, blockSize);
    return [fd, nextPosition, result];
};

const readBlockVersion = ([fd, position, result]) => {
    const [blockVersion, nextPosition] = readSync(fd, 4, position);
    result.blockVersion = parseInt(blockVersion, 16);
    console.log(` readBlockVersion `, blockVersion);
    return [fd, nextPosition, result];
};

const readPrevBlockHash = ([fd, position, result]) => {
    const [prevBlockHash, nextPosition] = readSync(fd, 32, position);
    result.prevBlockHash = prevBlockHash;
    console.log(` readPrevBlockHash `, prevBlockHash);
    return [fd, nextPosition, result];
};

const readMerkleRoot = ([fd, position, result]) => {
    const [merkleRoot, nextPosition] = readSync(fd, 32, position);
    result.merkleRoot = merkleRoot;
    console.log(` readMerkleRoot `, merkleRoot);
    return [fd, nextPosition, result];
};

const readTimeStamp = ([fd, position, result]) => {
    const [timeStamp, nextPosition] = readSync(fd, 4, position);
    const unixTime = parseInt(timeStamp, 16);
    result.timeStamp = unixTime;
    result.date = new Date(unixTime * 1000).toISOString();
    console.log(` readTimeStamp `, timeStamp, result.date);
    return [fd, nextPosition, result];
};

const readDifficultyTarget = ([fd, position, result]) => {
    const [difficultyTarget, nextPosition] = readSync(fd, 4, position);
    result.nBits = difficultyTarget;
    result.difficultyTarget = parseInt(difficultyTarget, 16);
    console.log(` readDifficultyTarget `, difficultyTarget, result.difficultyTarget);
    return [fd, nextPosition, result];
};

const readNonce = ([fd, position, result]) => {
    const [nonce, nextPosition] = readSync(fd, 4, position);
    result.nonce = parseInt(nonce, 16);
    console.log(` readNonce `, result.nonce);
    return [fd, nextPosition, result];
};

export const readTransactionCount = ([fd, position, result]) => {
    const [txCount, nextPosition] = readInteger(fd, position);
    result.transactionsCount = txCount;
    console.log(` readTransactionCount `, txCount);
    return [fd, nextPosition, result];
};

const readTransactionVersion = ([fd, position, result]) => {
    const [transactionVersion, nextPosition] = readSync(fd, 4, position);
    result.version = parseInt(transactionVersion, 16);
    //TODO : fix has witness
    result.hasWitness = false;
    console.log(` readTransactionVersion `, result.version);
    return [fd, nextPosition, result];
};

export default (fd, position) => compose(
    readTransactionVersion,
    readTransactionCount,
    readNonce,
    readDifficultyTarget,
    readTimeStamp,
    readMerkleRoot,
    readPrevBlockHash,
    readBlockVersion,
    readBlockSize,
    readMagicNumber,
)([fd, position, {}])
