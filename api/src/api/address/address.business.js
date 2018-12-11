import httpStatus from 'http-status';
import logger from '../../config/logger';
import Address from '../../models/address.model';
import Context from '../../models/context.model';

export const create = async (req, res, next) => {
    try {

        const {addresses, source, text} = req.body;

        const context = new Context({source, text});
        const savedContext = await context.save();
        logger.info(' address create context ', JSON.stringify(context, null, 2));

        await Promise.all(addresses.map(async address => {
            const createOrUpdateAddress = {address, context: [savedContext]};
            await Address.createOrUpdate(createOrUpdateAddress);
        }));

        res.status(httpStatus.OK);
        res.send();
    } catch (error) {
        next(error);
    }
};

export const list = async (req, res, next) => {
    try {
        const addresses = await Address.list(req.query.isVerified);
        res.status(httpStatus.OK);
        res.json(addresses);
    } catch (error) {
        next(error);
    }
};

export const verifyAddress = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const address = await Address.verifyAddress(req.params.id);
        res.status(httpStatus.OK);
        res.json(address);
    } catch (error) {
        next(error);
    }
};
