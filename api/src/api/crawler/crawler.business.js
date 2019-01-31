import httpStatus from 'http-status';
import logger from '../../config/logger';
import Source from '../../models/source.model';
import Address from '../../models/address.model';
import APIError from "../../misc/ApiError";
import isValidBtcAddress from '../../misc/ValidateAddress';
import {compose, ifElse, not, map, filter} from 'conductor';

export const createAddress = async (req, res, next) => {
    try {
        const {addresses, link, text, tags} = req.body;
        const sources = [];
        if (link && text) {
            const source = await Source.findOrCreateSource({link, text});
            sources.push(source);
        }
        //TODO: use mongoose bulk create https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite
        //      try to make if bulk create or update
        // https://stackoverflow.com/questions/39988848/trying-to-do-a-bulk-upsert-with-mongoose-whats-the-cleanest-way-to-do-this
        const addOrUpdateAddress = async (address) => {
            const insertAddress = {address, sources, tags};
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


export const updateAddresses = async (req, res, next) => {
    try {
        const {addresses, type, tags} = req.body;
        const addOrUpdateAddress = async (address) => {
            const insertAddress = {address, type, tags};
            try {
                if (isValidBtcAddress(address)) {
                    const updatedAddress = await Address.createOrUpdate(insertAddress);
                    logger.info(`wallet explroer crawler update address insert with success : ${JSON.stringify(updatedAddress, null, 2)}`);
                }
            } catch (e) {
                //ignore
            }
        };
        const hasErrors = errors => errors.length > 0;
        const returnError = errors => throw new APIError({message: errors, status: httpStatus.BAD_REQUEST});
        const returnSuccess = () => res.status(httpStatus.NO_CONTENT).send();
        await compose(
            ifElse(hasErrors, returnError, returnSuccess),
            filter(Boolean),// equivalent of lodash compact
            map(addOrUpdateAddress)
        )(addresses);
        res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};
