import {Schema, model} from 'mongoose';

const globalSchema = Schema({

    lastInsertedBlock: {
        type: Number,
        default: 0,
        index: true,
    }

});

export default model('Global', globalSchema);
