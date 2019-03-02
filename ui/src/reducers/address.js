import {addressesConstants} from 'constants/address';

const initialState = () => ({
    isVerified: true,
    isCreateOpen: false,
    isLoading: {},
    addresses: [],
    selectedAddress: null,
    pageNumber: 1,
    pageSize: 25,
    totalEntities: 0,
    nrOfAddresses: 0,
    nrOfBlackListedAddresses: 0,
    nrOfGrayListedAddresses: 0,
    nrOfVerifiedAddresses: 0,
    nrOfSources: 0,
    filterValues: {
        term: null,
        type: null,
        credibility: null,
        flag: 'black',
    }
});

const reduce = {};

reduce[addressesConstants.GET_ADDRESS_REQUEST] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_REQUEST]: true}
});

reduce[addressesConstants.GET_ADDRESS_SUCCESS] = (state, action) => ({
    ...state,
    ...action.payload,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_REQUEST]: false}
});

reduce[addressesConstants.GET_ADDRESS_FAIL] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_REQUEST]: false}
});

reduce[addressesConstants.GET_ADDRESS_BY_ADDRESS_REQUEST] = (state) => ({
    ...state,
    selectedAddress: null,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_BY_ADDRESS_REQUEST]: true}
});

reduce[addressesConstants.GET_ADDRESS_BY_ADDRESS_SUCCESS] = (state, action) => ({
    ...state,
    selectedAddress: action.payload,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_BY_ADDRESS_REQUEST]: false}
});

reduce[addressesConstants.GET_ADDRESS_BY_ADDRESS_FAIL] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_BY_ADDRESS_REQUEST]: false}
});

reduce[addressesConstants.GET_ADDRESS_SUMMARY_REQUEST] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_SUMMARY_REQUEST]: true}
});

reduce[addressesConstants.GET_ADDRESS_SUMMARY_SUCCESS] = (state, action) => ({
    ...state,
    ...action.payload,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_SUMMARY_REQUEST]: false}
});

reduce[addressesConstants.GET_ADDRESS_SUMMARY_FAIL] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.GET_ADDRESS_SUMMARY_REQUEST]: false}
});

reduce[addressesConstants.TOGGLE_IS_VERIFIED] = (state, action) => ({
    ...state,
    isVerified: action.payload
});

reduce[addressesConstants.TOGGLE_CREATE_OPEN] = (state, action) => ({
    ...state,
    isCreateOpen: action.payload
});

reduce[addressesConstants.VERIFY_ADDRESS_REQUEST] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.VERIFY_ADDRESS_REQUEST]: true}
});

reduce[addressesConstants.VERIFY_ADDRESS_SUCCESS] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.VERIFY_ADDRESS_REQUEST]: false}
});

reduce[addressesConstants.VERIFY_ADDRESS_FAIL] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [addressesConstants.VERIFY_ADDRESS_REQUEST]: false}
});

reduce[addressesConstants.PUT_ADDRESS_FILTER_VALUES] = (state, action) => ({
    ...state,
    filterValues: action.payload,
});

export default (state = initialState(), action) => reduce[action.type] ? reduce[action.type](state, action) : state;
