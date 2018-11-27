/**
 * Created by vladtomsa on 26/11/2018
 */
import {addressesConstants} from '../constants/addresses';
const initialState = {
  addressInfoList: [],
  isLoading: null,
  selectedAddress: null,
  addressDetails: null,
  transactionsFlow: null,
  levelsBefore: 1,
  levelsAfter: 1,
  blockchainId: 2,
};


export default (state = initialState, {type, payload}) => {
  switch (type) {
    case (addressesConstants.ON_GET_ADDRESSES_INIT):
      return {...state, isLoading: addressesConstants.ON_GET_ADDRESSES_INIT};

    case (addressesConstants.ON_GET_ADDRESSES_SUCCESS):
      return {...state, isLoading: null, addressInfoList: payload};

    case (addressesConstants.ON_GET_ADDRESSES_DETAILS_INIT):
      return {...state, isLoading: addressesConstants.ON_GET_ADDRESSES_DETAILS_INIT, addressDetails: null};

    case (addressesConstants.ON_GET_ADDRESSES_DETAILS_SUCCESS):
      return {...state, isLoading: null, addressDetails: payload};

    case (addressesConstants.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_INIT):
      return {
        ...state,
        isLoading: addressesConstants.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_INIT,
        levelsBefore: payload.levelsBefore,
        levelsAfter: payload.levelsAfter,
        blockchainId: payload.blockchainId,
        transactionsFlow: null,
      };
    case (addressesConstants.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_SUCCESS):
      return {
        ...state,
        transactionsFlow: payload,
        isLoading: null,
      };

    case (addressesConstants.ON_GET_ADDRESSES_FAILURE):
    case (addressesConstants.ON_GET_ADDRESSES_DETAILS_FAILURE):
    case (addressesConstants.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_FAILURE):
      return {...state, isLoading: null};

    case (addressesConstants.ON_SELECT_ADDRESS):
      return {...state, selectedAddress: payload};
    default:
      return state;
  }
}
