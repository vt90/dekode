import httpStatus from 'http-status';
import Block from '../../models/block.model';
import Transaction from '../../models/transaction.model';
import Global from '../../models/global.model';
import Address from "../../models/address.model";

export const create = async (req, res, next) => {
    try {
        const {block, tx, addresses} = req.body;
        try {
            await Address.insertMany(addresses, {ordered: false});
        } catch (error) {
        }
        try {
            await Transaction.insertMany(tx, {ordered: false});
        } catch (error) {
        }

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
