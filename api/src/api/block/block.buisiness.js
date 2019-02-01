import httpStatus from 'http-status';
// import logger from '../../config/logger';
import Block from '../../models/block.model';
import Transaction from '../../models/transaction.model';
import Global from '../../models/global.model';
import compact from 'lodash/compact';
import get from 'lodash/get';
import Address from "../../models/address.model";

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
        throw  new Error('test');
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
            tx: [],
        };
        // tx.forEach(console.log);
        for (let i = 0; i < tx.length; ++i) {
            const transaction = await Transaction.create(tx[i]);
            block.tx.push(get(transaction, '_id', null));
        }
        block.tx = compact(block.tx);
        await Block.create(block);
        const global = await Global.findOne();
        if (global === null) {
            await new Global({lastInsertedBlock: 1}).save();
        } else {
            await Global.findOneAndUpdate({}, {$inc: {lastInsertedBlock: 1}}).exec();
        }

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
