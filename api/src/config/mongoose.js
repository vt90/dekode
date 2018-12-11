import mongoose from 'mongoose';
import logger from '../config/logger';
import environment from './environment'

// set mongoose Promise to Bluebird
// mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// print mongoose logs in dev env
if (environment.env === 'development') {
    mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
export const connect = async () => {
    return await mongoose.connect(environment.mongo.uri, {
        keepAlive: 1,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
};
