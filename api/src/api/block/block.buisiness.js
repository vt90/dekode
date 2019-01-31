import httpStatus from 'http-status';
// import logger from '../../config/logger';
import Block from '../../models/block.model';

export const create = async (req, res, next) => {
    try {
        const {
            hash,
            merkleroot,
            confirmations,
            strippedsize,
            size,
            weight,
            versionHex,
            mediantime,
            nonce,
            bits,
            difficulty,
            chainwork,
            nTx,
            previousblockhash,
            nextblockhash,
            tx,
        } = req.body;

        const block = {
            hash,
            merkleroot,
            confirmations,
            strippedsize,
            size,
            weight,
            versionHex,
            mediantime,
            nonce,
            bits,
            difficulty,
            chainwork,
            nTx,
            previousblockhash,
            nextblockhash,
        };

        await Block.create(block);
        res.status(httpStatus.OK).end();

    } catch (error) {
        next(error);
    }
};

export const findBlock = async (req, res, next) => {
    try {
        const {hash} = req.params;
        const block = await Block.findBlock({hash});
        res.status(httpStatus.OK).json(block);
    } catch (error) {
        next(error);
    }
};
