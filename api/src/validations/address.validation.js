import Joi from 'joi';
import AddressModel from '../models/address.model';

export const listAddresses = {
    query: {
        pageNumber: Joi.number().min(1),
        pageSize: Joi.number().min(1),
    }
};

export const createAddress = {
    body: {
        addresses: Joi.array().items(Joi.string()).required(),
        link: Joi.string().uri(),
    }
};

export const verifyAddress = {
    params: {
        id: Joi.string().required(),
    },
    body: {
        credibility: Joi.string().valid(AddressModel.schema.path('credibility').enumValues).required()
    }
};

export const updateAddressType = {
    body: {
        type: Joi.string().valid(AddressModel.schema.path('type').enumValues)
    }
};
