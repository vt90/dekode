import http from 'config/http';
import {ADDRESS_API} from 'constants/api-routes';
import {addressesConstants} from 'constants/address';
import {getSearchParams} from 'misc';

export const create = (data) => http.post(`${ADDRESS_API}`, data);
export const get = (id, params) => id ? http.get(`${ADDRESS_API}/address/${id}`) : http.post(`${ADDRESS_API}/filter`, params);
export const verify = (id) => http.post(`${ADDRESS_API}/${id}`);

export const getAddress = (address) => async (dispatch) => {
    try {
        dispatch(getAddressRequest());
        const result = await get(address);
        dispatch(getAddressSuccess(result));
    } catch (error) {
        dispatch(getAddressFail(error));
    }
};

export const getAddresses = (params = {}) => async dispatch => {
    try {
        const searchParams = getSearchParams(params);
        dispatch(getAddressesRequest(searchParams));
        const result = await get(null, searchParams);
        dispatch(getAddressesSuccess(result));
    } catch (error) {
        dispatch(getAddressesFail(error));
    }
};

export const getAddressesNextPage = (params = {}) => async dispatch => {
    try {
        dispatch(putAddressAddressPageHistory({id: params.id}));
        dispatch(getAddresses(params));
    } catch (error) {
        dispatch(getAddressesFail(error));
    }
};

export const getAddressesPreviousPage = (params = {}) => async (dispatch, getState) => {
    try {
        const pageHistory = [...getState().address.pageHistory];
        pageHistory.pop();
        if (pageHistory.length > 0) params.id = pageHistory[pageHistory.length - 1].id;
        dispatch(setAddressAddressPageHistory(pageHistory));
        dispatch(getAddresses(params));
    } catch (error) {
        dispatch(getAddressesFail(error));
    }
};

export const getAddressesSummary = () => async dispatch => {
    try {
        dispatch(getAddressesSummaryRequest());
        const result = await http.get(`${ADDRESS_API}/summary`);
        dispatch(getAddressesSummarySuccess(result));
    } catch (error) {
        dispatch(getAddressesSummaryFail(error));
    }
};

export const createAddresses = (data) => async (dispatch) => {
    try {
        dispatch(createAddressesRequest());
        const result = await create(data);
        dispatch(createAddressesSuccess(result));
        dispatch(toggleCreateOpen(false));
        // ToDo call getAddresses with new filter
    } catch (error) {
        dispatch(createAddressesFail(error));
    }
};

const getAddressRequest = () => ({type: addressesConstants.GET_ADDRESS_BY_ADDRESS_REQUEST});
const getAddressSuccess = payload => ({type: addressesConstants.GET_ADDRESS_BY_ADDRESS_SUCCESS, payload});
const getAddressFail = error => ({type: addressesConstants.GET_ADDRESS_BY_ADDRESS_FAIL, payload: error});

const getAddressesRequest = payload => ({type: addressesConstants.GET_ADDRESS_REQUEST, payload});
const getAddressesSuccess = payload => ({type: addressesConstants.GET_ADDRESS_SUCCESS, payload});
const getAddressesFail = error => ({type: addressesConstants.GET_ADDRESS_FAIL, payload: error});

const getAddressesSummaryRequest = () => ({type: addressesConstants.GET_ADDRESS_SUMMARY_REQUEST});
const getAddressesSummarySuccess = payload => ({type: addressesConstants.GET_ADDRESS_SUMMARY_SUCCESS, payload});
const getAddressesSummaryFail = error => ({type: addressesConstants.GET_ADDRESS_SUMMARY_FAIL, payload: error});

const createAddressesRequest = () => ({type: addressesConstants.CREATE_ADDRESS_REQUEST});
const createAddressesSuccess = () => ({type: addressesConstants.CREATE_ADDRESS_SUCCESS});
const createAddressesFail = error => ({type: addressesConstants.CREATE_ADDRESS_FAIL, payload: error});

// export const verifyAddress = (id) => async dispatch => {
//     try {
//         dispatch(verifyAddressesRequest());
//         const result = await verify(id);
//         dispatch(verifyAddressesSuccess(result));
//     } catch (error) {
//         //ignore
//         dispatch(verifyAddressesFail(error));
//     }
// };
//
// const verifyAddressesRequest = () => ({type: addressesConstants.VERIFY_ADDRESS_REQUEST});
// const verifyAddressesSuccess = payload => ({type: addressesConstants.VERIFY_ADDRESS_SUCCESS, payload});
// const verifyAddressesFail = error => ({type: addressesConstants.VERIFY_ADDRESS_FAIL, payload: error});

export const toggleCreateOpen = payload => ({type: addressesConstants.TOGGLE_CREATE_OPEN, payload});
export const putAddressFilterValues = payload => ({type: addressesConstants.PUT_ADDRESS_FILTER_VALUES, payload});
export const putAddressAddressPageHistory = payload => ({type: addressesConstants.PUT_ADDRESS_PAGE_HISTORY, payload});
export const setAddressAddressPageHistory = payload => ({type: addressesConstants.SET_ADDRESS_PAGE_HISTORY, payload});
