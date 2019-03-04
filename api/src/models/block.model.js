import {Schema, model} from 'mongoose';
import httpStatus from 'http-status';
import ApiError from "../misc/ApiError";

const blockSchema = Schema({

    hash: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
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

    nonce: {
        type: Number,
    },

    bits: {
        type: String,
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
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },

    nextblockhash: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },

    tx: [{
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    }]

}, {timestamps: true});

blockSchema.statics = {

    async create(block) {
        try {
            if (block.time) {
                //https://stackoverflow.com/questions/42905877/java-simpledateformat-wrongly-parse-given-timestamp
                block.date = new Date(block.time * 1000);
            }
            if (block.mediantime) {
                block.medianDate = new Date(block.mediantime * 1000);
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
