const path = require('path');
import dotenv from 'dotenv-safe';

dotenv.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example')
});

export default {
    env: process.env.NODE_ENV,
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 9000,
    logs: process.env.NODE_ENV === 'development' ? 'dev' : 'combined',
    mongo: {
        uri: process.env.NODE_ENV === 'test'
            ? process.env.MONGO_URI_TESTS
            : process.env.MONGO_URI,
    },
};
