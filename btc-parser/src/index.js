import fs from 'fs';
import readHeader from './readHeader'
import readTranscations from './readTransactions'

const getPath = blk => `E:\\bitcoin\\${blk}.dat`;

const fd = fs.openSync(getPath('blk00000'), 'r+');

const blockHeader = readHeader(fd);

console.log(blockHeader);
console.log(readTranscations(fd, blockHeader.position));

fs.closeSync(fd);
