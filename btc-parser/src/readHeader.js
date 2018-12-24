import readSync from './readSync';
import {compose} from 'conductor';

const MAGIC_NUMBER = 'd9b4bef9';

const readMagicNumber = ({fd, blockHeader, position}) => {
    const [magicNumber, nextPosition] = readSync(fd, 4, position);

    if (magicNumber.toLowerCase() !== MAGIC_NUMBER) {
        throw new Error('invalid block');
    }

    blockHeader.magicNumber = magicNumber;
    return {fd, blockHeader, position: nextPosition};
};

const readBlockSize = ({fd, blockHeader, position}) => {
    const [blockSize, nextPosition] = readSync(fd, 4, position);
    blockHeader.blockSize = parseInt(blockSize, 16);
    return {fd, blockHeader, position: nextPosition};
};

const readBlockVersion = ({fd, blockHeader, position}) => {
    const [blockVersion, nextPosition] = readSync(fd, 4, position);
    blockHeader.blockVersion = parseInt(blockVersion, 16);
    return {fd, blockHeader, position: nextPosition};
};

const readPrevBlockHash = ({fd, blockHeader, position}) => {
    const [prevBlockHash, nextPosition] = readSync(fd, 32, position);
    blockHeader.prevBlockHash = prevBlockHash;
    return {fd, blockHeader, position: nextPosition};
};

const readMerkleRoot = ({fd, blockHeader, position}) => {
    const [merkleRoot, nextPosition] = readSync(fd, 32, position);
    blockHeader.merkleRoot = merkleRoot;
    return {fd, blockHeader, position: nextPosition};
};

const readTimeStamp = ({fd, blockHeader, position}) => {
    const [timeStamp, nextPosition] = readSync(fd, 4, position);
    const unixTime = parseInt(timeStamp, 16);
    blockHeader.timeStamp = unixTime;
    blockHeader.date = new Date(unixTime * 1000).toISOString();
    return {fd, blockHeader, position: nextPosition};
};

const readDifficultyTarget = ({fd, blockHeader, position}) => {
    const [difficultyTarget, nextPosition] = readSync(fd, 4, position);
    blockHeader.nBits = difficultyTarget;
    blockHeader.difficultyTarget = parseInt(difficultyTarget, 16);
    return {fd, blockHeader, position: nextPosition};
};

const readNonce = ({fd, blockHeader, position}) => {
    const [nonce, nextPosition] = readSync(fd, 4, position);
    blockHeader.nonce = parseInt(nonce, 16);
    return {fd, blockHeader, position: nextPosition}
};

const returnValues = ({blockHeader, position}) => ({blockHeader, position});

export default (fd, position) => compose(
    returnValues,
    readNonce,
    readDifficultyTarget,
    readTimeStamp,
    readMerkleRoot,
    readPrevBlockHash,
    readBlockVersion,
    readBlockSize,
    readMagicNumber,
)({fd, blockHeader: {}, position: position || 0});

