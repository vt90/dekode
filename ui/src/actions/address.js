import http from 'config/http';
import {ADDRESS_API} from 'constants/api-routes';
import {addressesConstants} from 'constants/address';

export const get = (id, params) => id ? http.get(`${ADDRESS_API}/${id}`) : http.get(`${ADDRESS_API}`, {params});
export const verify = (id) => http.post(`${ADDRESS_API}/${id}`);

export const getAddresses = (isVerified = true) => async dispatch => {
    try {
        const params = {isVerified};
        dispatch(getAddressesRequest());
        const result = await get(null, params);
        dispatch(getAddressesSuccess(result));
        dispatch(toggleIsVerified(isVerified));
    } catch (error) {
        //ignore
        dispatch(getAddressesFail(error));
    }
};

const getAddressesRequest = () => ({type: addressesConstants.GET_ADDRESS_REQUEST});
const getAddressesSuccess = payload => ({type: addressesConstants.GET_ADDRESS_SUCCESS, payload});
const getAddressesFail = error => ({type: addressesConstants.GET_ADDRESS_FAIL, payload: error});

export const toggleIsVerified = (payload) => ({type: addressesConstants.TOGGLE_IS_VERIFIED, payload});

export const verifyAddress = (id) => async dispatch => {
    try {
        dispatch(verifyAddressesRequest());
        const result = await verify(id);
        dispatch(verifyAddressesSuccess(result));
    } catch (error) {
        //ignore
        dispatch(verifyAddressesFail(error));
    }
};

const verifyAddressesRequest = () => ({type: addressesConstants.VERIFY_ADDRESS_REQUEST});
const verifyAddressesSuccess = payload => ({type: addressesConstants.VERIFY_ADDRESS_SUCCESS, payload});
const verifyAddressesFail = error => ({type: addressesConstants.VERIFY_ADDRESS_FAIL, payload: error});
