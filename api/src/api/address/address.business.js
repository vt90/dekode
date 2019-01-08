import httpStatus from 'http-status';
import logger from '../../config/logger';
import Source from '../../models/source.model';
import Address from '../../models/address.model';
import APIError from "../../misc/ApiError";
import isValidBtcAddress from '../../misc/ValidateAddress';
import {compose, ifElse, not, map, filter} from 'conductor';

export const create = async (req, res, next) => {
    try {
        const {addresses, link, text} = req.body;
        const sources = [];
        if (link && text) {
            const source = await Source.findOrCreateSource({link, text});
            sources.push(source);
        }
        //TODO: use mongoose bulk create https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite
        //      try to make if bulk create or update
        // https://stackoverflow.com/questions/39988848/trying-to-do-a-bulk-upsert-with-mongoose-whats-the-cleanest-way-to-do-this
        const addOrUpdateAddress = async (address) => {
            const insertAddress = {address, sources};
            insertAddress.toString = () => JSON.stringify(insertAddress, null, 2);
            try {
                if (isValidBtcAddress(address)) {
                    await Address.createOrUpdate(insertAddress);
                    logger.info(`create bulk addresses insert with success : ${insertAddress}`);
                }
            } catch (e) {
                logger.error(`create bulk addresses insert with error  ${insertAddress} error: ${e}`);
                return ({
                    address: address,
                    message: `Could not insert or update ${address}`,
                    reason: `${e}`,
                });
            }
        };
        const hasErrors = errors => errors.length > 0;
        const returnError = errors => throw new APIError({message: errors, status: httpStatus.BAD_REQUEST});
        const returnSuccess = () => res.status(httpStatus.NO_CONTENT).send();
        await compose(
            ifElse(hasErrors, returnError, returnSuccess),
            filter(Boolean),// equivalent of lodash compact
            map(addOrUpdateAddress)
        )(addresses, sources);
    } catch (error) {
        next(error);
    }
};

export const list = async (req, res, next) => {
    try {
        const pageNumber = +req.query.pageNumber || 1;
        const pageSize = +req.query.pageSize || 25;
        const {addresses, totalEntities} = await Address.list({pageNumber, pageSize});
        res.status(httpStatus.OK).json({
            pageNumber,
            pageSize,
            addresses,
            totalEntities
        });
    } catch (error) {
        next(error);
    }
};

export const findAddress = async (req, res, next) => {
    try {
        const {address} = req.params;
        if (isValidBtcAddress(address)) {
            const existingAddress = await Address.findAddress({address});
            res.status(httpStatus.OK).json(existingAddress);
        }
    } catch (error) {
        next(error);
    }
};

export const updateAddressType = async (req, res, next) => {
    try {
        if (req.params.address !== req.body.address) {
            // noinspection ExceptionCaughtLocallyJS
            throw new APIError({message: `Body and param address don't match`, status: httpStatus.BAD_REQUEST})
        }
        const address = await Address.findOne({address: req.params.address}).exec();
        if (!address) {
            // noinspection ExceptionCaughtLocallyJS
            throw new APIError({message: `Address not found`, status: httpStatus.NOT_FOUND})
        }
        if (address.type !== '-' && address.type !== req.body.type) {
            // noinspection ExceptionCaughtLocallyJS
            throw new APIError({
                message: `Address already has type associated ${address.type}`,
                status: httpStatus.BAD_REQUEST
            });
        }
        address.type = req.body.type;
        const updatedAddress = await Address.findOneAndUpdate({_id: address._id}, address, {new: true});
        res.status(httpStatus.OK).json(updatedAddress);
    } catch (error) {
        next(error);
    }
};

export const verifyAddress = async (req, res, next) => {
    try {
        const findAddress = (id) => Address.findOne({_id: id, flag: 'black'}).exec();
        const updateAddress = ({_id}) =>
            Address.findOneAndUpdate({_id}, {$set: {credibility: req.body.credibility}}, {new: true}).exec();
        const notFoundAddress = () => throw new APIError({message: `Address not found`, status: httpStatus.NOT_FOUND});
        await compose(
            ifElse(not, notFoundAddress, updateAddress),
            findAddress
        )(req.params.id);
        res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};
