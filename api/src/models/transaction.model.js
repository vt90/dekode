import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Address from './address.model';
import get from 'lodash/get';
import logger from '../config/logger';

const transactionSchema = Schema({

    txid: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },

    hash: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },

    vin: [{

        address: {
            type: String,
            index: true,
        },

        txid: {
            type: String,
            index: true,
            trim: true,
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
            type: String,
            index: true,
            trim: true,
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
                index: true,
                trim: true,
            }],

        },

        sequence: {
            type: Number,
        },

    }],

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

    blocktime: {
        type: Number,
    },

});

transactionSchema.statics = {

    async create(transaction) {
        try {
            if (transaction.vin[0].coinbase === undefined) {
                //is not coinbase
                for (let i = 0; i < transaction.vin.length; ++i) {
                    const existingTransaction = await this.findOne({txid: transaction.vin[i].txid}).exec();
                    if (existingTransaction) {
                        const outTx = existingTransaction.vout[transaction.vin[i].vout];
                        transaction.vin[i].address = outTx.address;
                        transaction.vin[i].vout = outTx.value;
                        await Address.findOneAndUpdate({address: outTx.address}, {$inc: {amount: -outTx.value}});
                    }
                }
            }
            for (let i = 0; i < transaction.vout.length; ++i) {
                // console.log('addressidx ', JSON.stringify(transaction, null, 2));
                const path = `vout.${i}.scriptPubKey.addresses.0`;
                if (get(transaction, 'vout.${i}.scriptPubKey.addresses', []).length > 1) {
                    logger.error(' dis tx has more addresse for output ', transaction.txid)
                }
                const addressIdx = get(transaction, path, undefined);
                // console.log('addressidx ', JSON.stringify(addressIdx, null, 2));
                if (addressIdx) {
                    const address = await Address.createOrUpdate({address: addressIdx});
                    await Address.findOneAndUpdate({address: address.address}, {$inc: {amount: transaction.vout[i].value}});
                    transaction.vout[i].address = address.address;
                }
            }
            return new this(transaction).save();
            // await Address.createOrUpdate()
        } catch (error) {
            throw error;
        }
    },

    list(hash) {
        try {
            return this.find({hash}).populate().exec();
        } catch (error) {
            throw error;
        }
    },

    listAddressTransactions({address, pageNumber, pageSize}) {
        const customLabels = {
            docs: 'transactions',
            page: 'currentPage',
            limit: 'pageSize',
            totalDocs: 'totalEntities',
        };
        const select = "-_id txid vin.address vout.address vin.vout vout.value";

        const options = {"$or": [{"vout.address": {"$in": [address]}}, {"vin.address": {"$in": [address]}}]};

        return TransactionModel.paginate(options, {
            page: pageNumber,
            limit: pageSize,
            select,
            customLabels
        });

    }
};

transactionSchema.plugin(mongoosePaginate);

const TransactionModel = model('Transaction', transactionSchema); // Used for paginate plugin

export default TransactionModel;

// export default model('Transaction', transactionSchema);
