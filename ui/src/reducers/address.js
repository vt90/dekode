import {addressesConstants} from 'constants/address';

const initialState = () => ({
    addresses: [],
    isLoading: false,
    isVerified: true,
});

const reduce = {};

reduce[addressesConstants.GET_ADDRESS_REQUEST] = (state) => ({
    ...state,
    isLoading: true,
});

reduce[addressesConstants.GET_ADDRESS_SUCCESS] = (state, action) => ({
    ...state,
    addresses: action.payload.addresses,
    isLoading: false,
});

reduce[addressesConstants.GET_ADDRESS_FAIL] = (state) => ({
    ...state,
    isLoading: false,
});

reduce[addressesConstants.TOGGLE_IS_VERIFIED] = (state, action) => ({
    ...state,
    isVerified: action.payload
});

reduce[addressesConstants.VERIFY_ADDRESS_REQUEST] = (state) => ({
    ...state,
    isLoading: true,
});

reduce[addressesConstants.VERIFY_ADDRESS_SUCCESS] = (state) => ({
    ...state,
    isLoading: false,
});

reduce[addressesConstants.VERIFY_ADDRESS_FAIL] = (state) => ({
    ...state,
    isLoading: false,
});

export default (state = initialState(), action) => reduce[action.type] ? reduce[action.type](state, action) : state;
