import {Schema, model} from 'mongoose';

const globalSchema = Schema({

    lastInsertedBlock: {
        type: Number,
        default: 0,
    }

});

export default model('Global', globalSchema);
