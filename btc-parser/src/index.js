import fs from 'fs';
import readBlock from './readBlock';

const getPath = blk => `E:\\bitcoin\\${blk}.dat`;
const fd = fs.openSync(getPath('blk01187'), 'r+');

let index = 0;
let pos = 0;
let block = null;
try {
    while (true) {
        const [readedBlock, position] = readBlock(fd, pos);
        pos = position;
        block = readedBlock;
        ++index;
    }

} catch (e) {
    console.error(e);
}

console.log(pos, index);
console.log('\n');
console.log(JSON.stringify(block, null, 2));
console.log('\n');
