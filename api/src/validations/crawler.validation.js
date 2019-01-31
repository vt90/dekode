import Joi from 'joi';
import AddressModel from "../models/address.model";

export const createAddress = {
    body: {
        addresses: Joi.array().items(Joi.string()).required(),
        link: Joi.string().uri().required(),
        text: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
    }
};

export const updateAddress = {
    body: {
        addresses: Joi.array().items(Joi.string()).required(),
        type: Joi.string().valid(AddressModel.schema.path('type').enumValues),
        tags: Joi.array().items(Joi.string()),
    }
};
