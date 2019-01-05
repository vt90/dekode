import readInteger from '../readInteger';
import {readSync} from '../misc';
import {compose} from 'conductor';

const readValue = ([fd, position, result]) => {
    const [value, nextPosition] = readSync(fd, 8, position);
    //TOOD this value is 10^-16
    result.value = parseInt(value, 10);
    result.rawValue = value;
    return [fd, nextPosition, result];
};

const readOutputScriptLength = ([fd, position, result]) => {
    const [scriptLength, nextPosition] = readInteger(fd, position);
    result.scriptLength = scriptLength;
    return [fd, nextPosition, result];
};

const readTransactionOutScript = ([fd, position, result]) => {
    const [script, nextPosition] = readSync(fd, result.scriptLength, position);
    result.script = script;
    return [fd, nextPosition, result];
};

export default (fd, position) => compose(
    readTransactionOutScript,
    readOutputScriptLength,
    readValue,
)([fd, position, {}]);
