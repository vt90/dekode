import httpStatus from 'http-status';
import logger from '../../config/logger';
import Source from '../../models/source.model';
import Address from '../../models/address.model';
import Global from '../../models/global.model';
import APIError from "../../misc/ApiError";
import isValidBtcAddress from '../../misc/ValidateAddress';
import {compose, ifElse, not, map, filter} from 'conductor';

export const create = async (req, res, next) => {
    try {
        const {addresses, link, text, sourceName} = req.body;
        const sources = [];
        if (link && text) {
            const source = await Source.findOrCreateSource({link, text, sourceName});
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

export const update = async (req, res, next) => {
    try {
        if (!req.body.type && !req.body.credibility) {
            // noinspection ExceptionCaughtLocallyJS
            throw  new APIError({
                message: "Address type / credibility not specified",
                status: httpStatus.BAD_REQUEST
            });
        }
        const findAddress = (address) => Address.findOne({address}).exec();
        const notFoundAddress = () => throw new APIError({message: `Address not found`, status: httpStatus.NOT_FOUND});
        const prepareAddressForUpdate = (address) => {
            const {type, credibility} = req.body;
            if ((type && type === address.type) && (credibility && credibility === address.credibility)) {
                throw  new APIError({
                    message: "Address type / credibility are the same",
                    status: httpStatus.BAD_REQUEST
                });
            }
            if (type) address.type = type;
            if (credibility) address.credibility = credibility;
            // NOTE: delete address.updatedAt is not working, in order to fix this I had to set it equal to undefined
            address.updatedAt = undefined;
            return address;
        };
        const updateAddress = (address) => {
            console.log(`              updateAddress               `, address);
            return Address.findOneAndUpdate({_id: address._id}, address, {new: true}).exec();
        };
        const updatedAddress = await compose(
            updateAddress,
            ifElse(not, notFoundAddress, prepareAddressForUpdate),
            findAddress,
        )(req.body.address);
        res.status(httpStatus.OK).json(updatedAddress);
    } catch (error) {
        next(error);
    }
};

export const findAddressesSummary = async (req, res, next) => {
    try {
        // const x = await Address.summary();
        // const nrOfAddresses = await Address.estimatedDocumentCount().exec();
        const nrOfBlackListedAddresses = await Address.count({flag: 'black'}).exec();
        const nrOfGrayListedAddresses = await Address.count({flag: 'grey'}).exec();
        const nrOfVerifiedAddresses = await Address.count({credibility: 'verified'}).exec();
        const nrOfSources = await Source.estimatedDocumentCount().exec();
        const lastInsertedBlock = await Global.findOne().select(["-_id", "-__v"]).exec();
        const result = {
            //TODO GET RID OF DIS
            nrOfAddresses: 0,
            nrOfBlackListedAddresses,
            nrOfGrayListedAddresses,
            nrOfVerifiedAddresses,
            nrOfSources,
            lastInsertedBlock: lastInsertedBlock ? lastInsertedBlock.lastInsertedBlock : 0,
        };

        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
};

export const filterAddresses = async (req, res, next) => {
    try {
        const {term, type, flag, credibility} = req.body;
        const pageNumber = +req.body.pageNumber || 1;
        // const pageSize = +req.body.pageSize || 25;
        const pageSize = 25;
        // const {addresses, totalEntities} = await Address.filter({term, type, flag, credibility, pageNumber, pageSize});
        const addresses = await Address.filter({term, type, flag, credibility, pageNumber, pageSize});
        res.status(httpStatus.OK).json({
            pageNumber,
            // pageSize,
            addresses,
            // totalEntities
        });
    } catch (error) {
        next(error);
    }
};
