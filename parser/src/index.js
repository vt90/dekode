import BtcClient from 'bitcoin-core';

async function main() {
    try {
        const client = new BtcClient({
            host: "54.37.188.120",
            username: '__cookie__',
            password: 'dc00185265171b5785728fd33dc2f5f054bc1e84b1073daf646f2e5b5f118f53',
            version: '0.17.1'
        });
        const blockCount = await client.getBlockCount();
        const blockHash = await client.getBlockHash(blockCount);
        const block = await client.getBlock(blockHash);
        const tx = await client.getRawTransaction(block.tx[0]);
        console.log(tx);
    } catch (e) {
        console.log('parser error ', e);
    }
}

main();
