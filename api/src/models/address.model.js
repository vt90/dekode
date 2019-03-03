import httpStatus from 'http-status';
import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Source from './source.model';
import ApiError from "../misc/ApiError";
import escapeRegex from '../misc/escapeRegex';
import unionWith from 'lodash/unionWith';
import isEmpty from 'lodash/isEmpty';
// import Context from './context.model';
// import logger from '../config/logger';

const flagEnum = ['white', 'grey', 'black'];
const typeEnum = ['-', 'Exchanges', 'Pools', 'Services/others', 'Gambling', 'Old/historic'];
const credibilityEnum = ['not verified', 'verified'];

const addressSchema = Schema({

    address: {
        type: String,
        match: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },

    type: {
        type: String,
        enum: typeEnum,
        default: '-',
        required: 'false',
        index: true,
    },

    flag: {
        type: String,
        enum: flagEnum,
        default: 'white',
        index: true,
    },

    credibility: {
        type: String,
        enum: credibilityEnum,
        default: 'not verified',
        index: true,
    },

    tags: {
        type: [{
            type: String,
        }],
    },

    amount: {
        type: Number,
        default: 0.0
    },

    sources: [{
        type: Schema.Types.ObjectId,
        ref: Source,
    }]

}, {timestamps: true});

addressSchema.statics = {

    async createOrUpdate(address) {
        try {
            if (!address) return;
            const existingAddress = await this.findOne({address: address.address}).exec();
            if (existingAddress) {
                if (address.sources && address.sources.length > 0) {
                    // Search for the current source if it's already assign to current the address
                    const sourceIndex = existingAddress.sources.indexOf(address.sources[0]._id);
                    if (sourceIndex === -1) {
                        if (existingAddress.flag === 'white') {
                            existingAddress.flag = 'grey';
                        } else {
                            existingAddress.flag = 'black';
                        }
                        existingAddress.sources.push(...address.sources);
                    }
                }
                if (address.tags && address.tags.length > 0) {
                    const cmp = (v1, v2) => v1.toLowerCase() === v2.toLowerCase();
                    existingAddress.tags = unionWith(existingAddress.tags, address.tags, cmp);
                }
                if (address.type) {
                    existingAddress.type = address.type;
                }
                // NOTE: delete address.updatedAt is not working, in order to fix this I had to set it equal to undefined
                existingAddress.updatedAt = undefined;
                return this.findOneAndUpdate({_id: existingAddress._id}, existingAddress).exec()
            } else {
                if (address.sources && address.sources.length > 0) {
                    address.flag = 'grey';
                } else {
                    address.sources = [];
                }
                return new this(address).save();
            }
        } catch (error) {
            throw error;
        }
    },

    async findAddress({address}) {
        try {
            const result = await this.findOne({address})
                .populate('sources', {__v: 0})
                .select(['-__v', '-_id'])
                .exec();
            if (!result) {
                // noinspection ExceptionCaughtLocallyJS
                throw new ApiError({
                    message: 'Address not found',
                    status: httpStatus.NOT_FOUND
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    async list({pageSize, options = {}, sort = {}}) {
        try {
            const select = ['-sources', '-__v'];
            return await this.find(options).sort(sort).limit(pageSize + 1).select(select).exec();
        } catch (error) {
            throw error;
        }
    },

    async filter({
                     term,
                     type,
                     flag,
                     credibility,
                     pageSize,
                     id,
                 }) {
        try {
            const options = {};
            const sort = {_id: 1};
            if (id) options._id = {'$gt': id};
            if (term) options.address = {'$eq': term};
            if (type) options.type = {'$eq': type};
            if (flag) options.flag = {'$eq': flag};
            if (credibility) options.credibility = {'$eq': credibility};
            const addresses = await this.list({pageSize, options});
            return {
                addresses,
                hasNext: addresses.length >= pageSize,
                sort
            };
        } catch (error) {
            throw error;
        }
    },

    summary() {
        // return this.aggregate([
        //     {
        //         "$match": {
        //             flag: "black",
        //         },
        //     },
        //     {
        //         "$group": {
        //             "flag": "$flag",
        //             count: {"$sum": 1}
        //         }
        //     }
        // ])
    }

};

addressSchema.plugin(mongoosePaginate);

const AddressModel = model('Address', addressSchema); // Used for paginate plugin

// export default model('Address', addressSchema);
export default AddressModel;
