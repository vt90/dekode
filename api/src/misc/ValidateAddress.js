import httpStatus from "http-status";
import BtcValidator from 'wallet-address-validator';
import APIError from "./ApiError";

export default (address) => {
    if (BtcValidator.validate(address, 'bitcoin', 'prod')) {
        return true;
    }
    // noinspection ExceptionCaughtLocallyJS
    throw new APIError({message: 'Invalid BTC address', status: httpStatus.BAD_REQUEST});
}
