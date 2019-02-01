import BtcClient from 'bitcoin-core';
import fs from 'fs';
import Axios from 'axios';

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
            password: 'e52cfa6329dd5d8b60796129c4046e7bc05ad9d46d84f2098a5c49aa597d8412',
            version: '0.17.1'
        });

        const blockCount = await client.getBlockCount();
        const lastInsertedBlock = ((await http.get('/addresses/summary')).lastInsertedBlock || 0) + 1;

        let blockHash = {};
        for (let x = lastInsertedBlock; x < blockCount; ++x) {
            try {
                // const blockHash = await client.getBlockHash(170);
                blockHash = await client.getBlockHash(x);
                const block = await client.getBlock(blockHash);
                const tx = [];
                for (let i = 0; i < block.tx.length; ++i) {
                    tx.push(await client.getRawTransaction(block.tx[i], 1));
                    // console.log('reading tx');
                }
                // console.log('finished reading tx');
                block.tx = tx;
                // //560938
                // fs.writeFileSync('block', JSON.stringify(block, null, 2));
                await http.post('/blocks/api/blocks', block);
            } catch (e) {
                console.log(`inner parser error`, e);
                fs.writeFileSync(blockHash, JSON.stringify(e, null, 2));
            }
        }
    } catch (e) {
        console.log('parser error ', e);
        fs.writeFileSync('parser error ???', JSON.stringify(e, null, 2));
    }
}

main();
