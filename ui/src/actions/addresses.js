/**
 * Created by vladtomsa on 26/11/2018
 */
import { onNotificationErrorInit } from './notifications';
import { addressesConstants } from '../constants/addresses';
import { http } from '../config/http';

const getAddressesInit = () => ({ type: addressesConstants.ON_GET_ADDRESSES_INIT });

const getAddressesSuccess = (data) => ({ type: addressesConstants.ON_GET_ADDRESSES_SUCCESS, payload: data });

const getAddressesFailure = () => ({ type: addressesConstants.ON_GET_ADDRESSES_FAILURE });

const getAddressDetailsInit = () => ({ type: addressesConstants.ON_GET_ADDRESSES_DETAILS_INIT });

const getAddressDetailsSuccess = (data) => ({ type: addressesConstants.ON_GET_ADDRESSES_DETAILS_SUCCESS, payload: data });

const getAddressDetailsFailure = () => ({ type: addressesConstants.ON_GET_ADDRESSES_DETAILS_FAILURE });


const getAddresseTransactionFlowInit = (params) => ({ type: addressesConstants.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_INIT, payload: params });

const getAddresseTransactionFlowSuccess = (data) => ({ type: addressesConstants.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_SUCCESS, payload: data });

const getAddresseTransactionFlowFailure = () => ({ type: addressesConstants.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_FAILURE });

export const getAddresses = () => async (dispatch) => {
    try {
        dispatch(getAddressesInit());

        const addressInfoList = await http.get('/addresses');

        dispatch(getAddressesSuccess(addressInfoList));
    }
    catch (e) {
        dispatch(getAddressesFailure());
        dispatch(onNotificationErrorInit(e));
    }
};

export const getAddressDetails = (data) => async (dispatch) => {
  try {
    dispatch(getAddressDetailsInit());

    const addressDetails = await http.post('/addresses/details', data);

    dispatch(getAddressDetailsSuccess(addressDetails));
  }
  catch (e) {
    dispatch(getAddressDetailsFailure());
    dispatch(onNotificationErrorInit(e));
  }
};

export const getAddressTransactionFlow = (params) => async (dispatch) => {
  try {
    dispatch(getAddresseTransactionFlowInit(params));

    const response = await http.post('/addresses/transaction-flow', params);

    dispatch(getAddresseTransactionFlowSuccess(response));
  }
  catch (e) {
    dispatch(getAddresseTransactionFlowFailure());
    dispatch(onNotificationErrorInit(e));
  }
};

export const selectAddress = (address) => {
  return { type: addressesConstants.ON_SELECT_ADDRESS, payload: address };
};
