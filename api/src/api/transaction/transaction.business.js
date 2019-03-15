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
        const transactions = await Transaction.list(req.params.tx);
        res.status(httpStatus.OK);
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

export const forward = async (req, res, next) => {
    try {
        const transactions = await Transaction.forward(req.params.tx);
        res.status(httpStatus.OK);
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

export const listAddressTransactions = async (req, res, next) => {
    try {
        const {address} = req.params;
        const pageNumber = +req.query.pageNumber || 1;
        const pageSize = +req.query.pageSize || 100;
        const {transactions, totalEntities} = await Transaction.listAddressTransactions({
            address,
            pageNumber,
            pageSize
        });
        res.status(httpStatus.OK).json({
            pageNumber,
            pageSize,
            transactions,
            totalEntities
        });
    } catch (error) {
        next(error);
    }
};
