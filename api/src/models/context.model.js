import {Schema, model} from 'mongoose';

const contextSchema = Schema({

    source: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    text: {
        type: String,
        required: true,
        trim: true,
    },

});

export default model('Context', contextSchema);
