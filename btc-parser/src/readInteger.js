import {readSync} from './misc';
import {compose} from 'conductor';

const readSize = ([fd, position]) => {
    const [size, nextPosition] = readSync(fd, 1, position);
    const parsedSize = parseInt(size, 16);
    return ([fd, nextPosition, parsedSize]);
};

const readNumber = ([fd, position, size]) => {
    if (size < 253) {
        return [size, position]
    }
    switch (size) {
        case 253:
            return readUint16([fd, position]);
        case 254:
            return readUint32([fd, position]);
        case 255:
            return readUint64([fd, position]);
    }
};

const readUint16 = ([fd, position]) => {
    const [hexNumber, nextPosition] = readSync(fd, 3, position);
    const number = parseInt(hexNumber, 16);
    return ([number, nextPosition]);
};

const readUint32 = ([fd, position]) => {
    const [hexNumber, nextPosition] = readSync(fd, 5, position);
    const number = parseInt(hexNumber, 16);
    return ([number, nextPosition]);
};
const readUint64 = ([fd, position]) => {
    const [hexNumber, nextPosition] = readSync(fd, 9, position);
    const number = parseInt(hexNumber, 16);
    return ([number, nextPosition]);
};

export default (fd, position) => compose(
    readNumber,
    readSize,
)([fd, position]);
