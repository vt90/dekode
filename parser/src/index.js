import {performance} from 'perf_hooks';
import BtcClient from 'bitcoin-core';
import fs from 'fs';
import Axios from 'axios';
import logger from './logger';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const baseURL = 'http://localhost:9000';

const http = Axios.create({
    baseURL,
    headers
});

http.interceptors.response.use(
    response => Promise.resolve(response.data),
    error => Promise.reject(error.response.data)
);

async function main() {
    try {
        const client = new BtcClient({
            host: "54.37.188.120",
            username: '__cookie__',
            password: 'f1ffef64df9565f7f105c99afb79009f407822760455514a1beb32abde01a50d',
            version: '0.17.1'
        });

        const blockCount = await client.getBlockCount();
        const lastInsertedBlock = ((await http.get('/addresses/summary')).lastInsertedBlock || 0) + 1;

        let blockHash = {};
        for (let x = lastInsertedBlock; x < blockCount; ++x) {
            const t0 = performance.now();
            try {
                // blockHash = await client.getBlockHash(170);
                blockHash = await client.getBlockHash(x);
                const block = await client.getBlock(blockHash);
                const tx = [];
                const blockAddresses = {};
                for (let i = 0; i < block.tx.length; ++i) {
                    const decodedTransaction = await client.getRawTransaction(block.tx[i], 1);
                    decodedTransaction.vout.forEach(
                        ({scriptPubKey: {addresses}}) => addresses.forEach(address => blockAddresses[address] = {address}));
                    tx.push(decodedTransaction);
                }
                const body = {
                    block,
                    tx,
                    addresses: Object.values(blockAddresses),
                };
                await http.post('/blocks/api/blocks', body);
            } catch (e) {
                logger.error(blockHash, e);
                fs.writeFileSync(blockHash, JSON.stringify(e, null, 2));
            }
            const t1 = performance.now();
            logger.info(`insert block ${x} : ${t1 - t0}`);
        }
    } catch (e) {
        logger.error(e);
    }
}

main();
