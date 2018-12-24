import Transaction from '../../models/transaction.model';
import logger from "../../config/logger";
import httpStatus from "http-status";

export const create = async (req, res, next) => {
    try {

        const transaction = new Transaction(req.body);
        const saveTransaction = await transaction.save();

        res.status(httpStatus.CREATED);
        res.send(saveTransaction);
    } catch (error) {
        next(error);
    }
};

export const list = async (req, res, next) => {
    try {
        const transactions = await Transaction.list(req.query.tx);
        res.status(httpStatus.OK);
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
