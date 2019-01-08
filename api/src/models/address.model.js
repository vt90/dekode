import httpStatus from 'http-status';
import {Schema, model} from 'mongoose';
import Source from './source.model';
import ApiError from "../misc/ApiError";
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
    },

    flag: {
        type: String,
        enum: flagEnum,
        default: 'white'
    },

    credibility: {
        type: String,
        enum: credibilityEnum,
        default: 'not verified'
    },

    sources: [{
        type: Schema.Types.ObjectId,
        ref: Source,
    }]

});

addressSchema.statics = {

    async createOrUpdate(address) {
        try {
            const existingAddress = await this.findOne({address: address.address}).exec();
            if (existingAddress) {
                if (address.sources.length > 0) {
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
                    return this.findOneAndUpdate({_id: existingAddress._id}, existingAddress).exec()
                }
            } else {
                if (address.sources.length > 0) {
                    address.flag = 'grey';
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
                .populate('sources')
                .select('-__v')
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

    async list({pageNumber, pageSize}) {
        try {
            const options = {};
            const select = ['-sources', '-__v', '-_id'];
            const addresses = await this.find(options)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .sort({createdAt: -1})
                .select(select)
                .exec();
            const totalEntities = await this.count();
            return {addresses, totalEntities};
        } catch (error) {
            throw error;
        }
        // const options = {
        //     status: {$ne: ['grey', 'black']},
        //     isVerified: {$eq: ["isVerified", isVerified]},
        // };
        // if (isVerified === false) {
        //     options.status.$ne[1] = 'white';
        // }
        // const select = isVerified === true ? '-context' : '+context';
        //
        // return this.aggregate([
        //     {
        //         $group: {
        //             _id: null,
        //             count: {$sum: 1},
        //             data:{
        //                 $push:{
        //                     address:'$address',
        //                     status: options.status,
        //                     isVerified: options.isVerified,
        //                     // context:isVerified ?'$context' :
        //                 }
        //             },
        //         }
        //         //     $project: {
        //         //         address: 1,
        //         //         status: options.status,
        //         //         isVerified: options.isVerified,
        //         //         context: 1,
        //         //         count: '$sum',
        //         //         _id: 1,
        //         //     }
        //     },
        // ]).exec();
        // return this.find(options)
        //     .skip(+pageNumber * +pageSize)
        //     .limit(+pageSize)
        //     .sort({createdAt: -1})
        //     .select(select)
        //     .select('-__v')
        //     .populate('context')
        //     .exec();
    },

    async verifyAddress(id) {
        // const existingAddress = await this.findOne({_id: Types.ObjectId(id)}).exec();
        // if (!existingAddress) {
        //     throw  new APIError({
        //         message: "Address not found!",
        //         status: httpStatus.NOT_FOUND
        //     });
        // }
        // if (existingAddress.status === 'black') {
        //     throw  new APIError({
        //         message: "Invalid operation, current address is already blacklisted",
        //         status: httpStatus.FORBIDDEN
        //     });
        // }
        // existingAddress.isVerified = true;
        // if (existingAddress.status === 'white') {
        //     existingAddress.status = 'grey';
        // } else {
        //     existingAddress.status = 'black';
        // }
        //
        // return this.findOneAndUpdate({_id: Types.ObjectId(existingAddress._id)}, existingAddress, {new: true});
    }
};

export default model('Address', addressSchema);
