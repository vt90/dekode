import httpStatus from 'http-status';
import {Schema, Types, model} from 'mongoose';
import APIError from "../misc/ApiError";
import Context from './context.model';
// import logger from '../config/logger';

const statusEnum = ['white', 'grey', 'black'];

const addressSchema = Schema({

    address: {
        type: String,
        match: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },

    status: {
        type: String,
        enum: statusEnum,
        default: 'white'
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    context: [{
        type: Schema.Types.ObjectId,
        ref: Context,
    }]

});

addressSchema.statics = {

    async createOrUpdate(address) {
        try {

            const existingAddress = await this.findOne({address: address.address}).exec();

            if (existingAddress) {
                if (existingAddress.status === 'white') {
                    existingAddress.status = 'grey';
                } else if (existingAddress.status === 'grey' && existingAddress.isVerified) {
                    existingAddress.status = 'black';
                }
                existingAddress.context.push(...address.context);
                return this.findOneAndUpdate({_id: Types.ObjectId(existingAddress._id)}, existingAddress).exec();
            } else {
                return new this(address).save();
            }

        } catch (error) {
            throw error;
        }
    },

    list(isVerified = true) {
        const options = {status: {$ne: ['grey', 'black']}, isVerified: {$eq: isVerified}};
        if (isVerified === false) {
            options.status.$ne[1] = 'white';
        }
        const select = isVerified === true ? '-context' : '+context';
        return this.find(options)
            .sort({createdAt: -1})
            .select(select)
            .select('-__v')
            .populate('context')
            .exec();
    },

    async verifyAddress(id) {
        const existingAddress = await this.findOne({_id: Types.ObjectId(id)}).exec();
        if (!existingAddress) {
            throw  new APIError({
                message: "Address not found!",
                status: httpStatus.NOT_FOUND
            });
        }
        if (existingAddress.status === 'black') {
            throw  new APIError({
                message: "Invalid operation, current address is already blacklisted",
                status: httpStatus.FORBIDDEN
            });
        }
        existingAddress.isVerified = true;
        if (existingAddress.status === 'white') {
            existingAddress.status = 'grey';
        } else {
            existingAddress.status = 'black';
        }

        return this.findOneAndUpdate({_id: Types.ObjectId(existingAddress._id)}, existingAddress, {new: true});
    }
};

export default model('Address', addressSchema);
