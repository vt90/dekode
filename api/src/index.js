import http from 'http';
import app from './config/express.js';
import logger from './config/logger.js';
import environment from './config/environment.js';
import * as mongoose from './config/mongoose.js';

const server = http.createServer(app);

mongoose.connect().then(() => {
    server.listen(environment.port, environment.ip, () => {
        // console.log('app is listening');
        logger.info(`app is listening ${environment.port} ${environment.env}`);
    });
});
