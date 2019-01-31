import {Schema, model} from 'mongoose';
import httpStatus from 'http-status';
import ApiError from "../misc/ApiError";

const blockSchema = Schema({

    hash: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    merkleroot: {
        type: String,
        trim: true,
        required: true,
    },

    confirmations: {
        type: Number,
    },

    strippedsize: {
        type: Number,
    },

    size: {
        type: Number,
    },

    weight: {
        type: Number,
    },

    height: {
        type: Number,
    },

    version: {
        type: Number,
    },

    versionHex: {
        type: Number,
    },

    time: {
        type: Number,
    },

    date: {
        type: Date,
    },

    mediantime: {
        type: Number,
    },

    medianDate: {
        type: Date,
    },

    nonce: {
        type: Number,
    },

    bits: {
        type: Number,
    },

    difficulty: {
        type: Number,
    },

    chainwork: {
        type: String,
    },

    nTx: {
        type: String,
    },

    previousblockhash: {
        type: String
    },

    nextblockhash: {
        type: String
    },

    tx: [{
        type: String
    }]

}, {timestamps: true});

blockSchema.statics = {

    async create(block) {
        try {
            if (block.time) {
                block.date = new Date(block.time);
            }
            if (block.mediantime) {
                block.medianDate = new Date(block.mediantime);
            }
            return new this(block).save();
        } catch (error) {
            throw error;
        }
    },

    async findBlock({hash}) {
        try {
            const select = ['-__v', '-_id', '-tx'];
            const result = await this.findOne({hash})
                .select(select)
                .exec();
            if (!result) {
                // noinspection ExceptionCaughtLocallyJS
                throw new ApiError({
                    message: 'Block not found',
                    status: httpStatus.NOT_FOUND
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
};

export default model('Block', blockSchema);
