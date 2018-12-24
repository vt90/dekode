import {Schema, model} from 'mongoose';

const sourceSchema = Schema({

    link: {
        index: true,
        type: String,
        required: true,
        trim: true,
    },

    text: {
        type: String,
        required: true,
        trim: true,
    },

});

sourceSchema.statics = {

    async findOrCreateSource(source) {
        try {
            const existingSource = await this.findOne({link: source.link}).exec();
            if (existingSource) {
                return existingSource;
            }
            return new this(source).save();
        } catch (error) {
            throw error;
        }
    }

};

export default model('Source', sourceSchema);
