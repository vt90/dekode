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
        text: Joi.string(),
    }
};

export const updateAddress = {
    body: {
        address: Joi.string().min(25).max(34).required(),
        type: Joi.string().valid(AddressModel.schema.path('type').enumValues),
        credibility: Joi.string().valid(AddressModel.schema.path('credibility').enumValues)
    }
};

export const filterAddresses = {
    body: {
        // term: Joi.string().min(2).max(34),
        term: Joi.string().max(34),
        flag: Joi.string().valid(AddressModel.schema.path('flag').enumValues),
        type: Joi.string().valid(AddressModel.schema.path('type').enumValues),
        credibility: Joi.string().valid(AddressModel.schema.path('credibility').enumValues),
        pageNumber: Joi.number().min(1),
        pageSize: Joi.number().min(1),
    }
};
