/**
 * Created by vladtomsa on 28/11/2018
 */
const {spawn, env} = require('script-file');

const argv = require('yargs').argv;

const domain = argv.domain || 'http://localhost:8000';

const main = [
    env({
      NODE_ENV: 'production',
      DB_HOST: 'ec2-107-20-174-127.compute-1.amazonaws.com',
      DB_DATABASE: 'dbshvge4v4na00',
      DB_USERNAME: 'ufymkfghopajha',
      DB_PASSWORD: '8a5014b342a4610d05d70b6c8f503ad61132147cef28b53c685f526703ecb48b',
      DOMAIN: domain,
    }),
    () => {
      spawn('npm run install:api', {resolve: 'api dependencies installed complete'})
        .then(() => spawn('npm run install:ui', {resolve: 'ui dependencies installed complete'}))
        .then(() => spawn(`npm run build:ui -- --domain=${domain}`, {resolve: 'ui build complete'}))
        .then(() => spawn('npm run move:ui:build', {resolve: 'moved ui build'}))
        .then(() => spawn('npm run start:api', { resolve: 'started api server'}));
    }
];

module.exports = {main};
