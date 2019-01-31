import {Schema, model} from 'mongoose';
import Address from './address.model';

const transactionSchema = Schema({

    txid: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    hash: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    version: {
        type: Number,
    },

    size: {
        type: Number,
    },

    vsize: {
        type: Number,
    },

    weight: {
        type: Number,
    },

    locktime: {
        type: Number,
    },

    hex: {
        type: String,
    },

    blockhash: {
        type: String,
    },

    confirmations: {
        type: Number,
    },

    time: {
        type: Number,
    },

    date: {
        type: Date,
    },

    blocktime: {
        type: Number,
    },

    blocktDate: {
        type: Date,
    },

    vin: [{

        address: {
            type: Schema.Types.ObjectId,
            ref: Address,
        },

        txid: {
            type: String,
            trim: true,
            required: true,
            index: true
        },

        value: {
            type: Number,
        },

        vout: {
            type: Number,
        },

        scriptSig: {

            asm: {
                type: String,
            },

            hex: {
                type: String,
            },
        },

        coinbase: {
            type: String,
        },

        sequence: {
            type: Number,
        },

    }],

    vout: [{

        address: {
            type: Schema.Types.ObjectId,
            ref: Address,
        },

        txid: {
            type: String,
            trim: true,
            required: true,
            index: true
        },

        value: {
            type: Number,
        },

        n: {
            type: Number,
        },

        scriptPubKey: {

            asm: {
                type: String,
            },

            hex: {
                type: String,
            },

            reqSigs: {
                type: Number,
            },

            type: {
                type: String,
            },

            addresses: [{
                type: String,
            }],

        },

        coinbase: {
            type: String,
        },

        sequence: {
            type: Number,
        },

    }],

});

transactionSchema.statics = {

    create(transaction) {
        try {

            // await Address.createOrUpdate()
        } catch (error) {
            throw error;
        }
    },
    /*
        async createBlock(block) {
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

     */

    list(hash) {
        try {
            return this.find({hash}).populate().exec();
        } catch (error) {
            throw error;
        }
    }
};

export default model('Transaction', transactionSchema);

