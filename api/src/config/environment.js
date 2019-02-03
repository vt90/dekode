import path from 'path';
import dotenv from 'dotenv-safe';

let dotEnvPath = path.join(__dirname, '../../.env');
let sample = path.join(__dirname, '../../.env.example');

if (process.env.NODE_ENV === 'production') {
    dotEnvPath = path.join(__dirname, '../.env');
    sample = path.join(__dirname, '../.env.example');
}

dotenv.load({
    path: dotEnvPath,
    sample: sample
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
