import {Schema, model} from 'mongoose';
import Address from './address.model';

const transactionSchema = Schema({
    hash: {
        type: String,
        index: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: Address,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: Address,
    },
    output: Number,
    fee: Number,
});

transactionSchema.statics = {
    list(hash) {
        try {
            return this.find({hash}).populate().exec();
        } catch (error) {
            throw error;
        }
    }
};

export default model('Transaction', transactionSchema);

