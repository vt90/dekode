import fs from 'fs';
import endianness from './endianness';

export default (fd, length, position) => {
    const buffer = Buffer.alloc(length);
    const read = fs.readSync(fd, buffer, 0, length, position);
    console.log(` read length : `, read, ' position : ', position, " result ", buffer.toString('hex'));
    const result = endianness(buffer.toString('hex'));
    return [result, position + read];
}
