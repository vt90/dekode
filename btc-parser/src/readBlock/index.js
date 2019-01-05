import {readSync} from '../misc';
import readBlockHeader from '../readBlockHeader';
import readTransaction from '../readTransaction';

export default function readBlock(fd, position) {
    const block = {
        header: {},
        transactions: [],
    };
    const [, nextPosition, header] = readBlockHeader(fd, position);
    block.header = header;
    let pos = nextPosition;
    while (block.transactions.length < header.transactionsCount) {
        const [, nextPosition, transaction] = readTransaction(fd, pos);
        pos = nextPosition;
        block.transactions.push(transaction);
        const [height, nextBlockPosition] = readSync(fd, 4, pos);
        block.height = height;
        pos = nextBlockPosition;
    }
    return [block, pos];
};


/*
    block:
    {
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
        transactions:{
            {
                transactionsInCount,
                transactionsIn:[
                    {
                        prevHash,
                        prevTxIndex,
                        scriptLength,
                        script,
                        endSequence,
                    }
                ],
                transactionsOutCount,
                transactionsOut:[
                    {
                        value,
                        rawValue,
                        scriptLength,
                        script,
                    }
                ]
            }
        }
    }
 */

