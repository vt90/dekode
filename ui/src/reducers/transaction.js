import {transactionConstants} from 'constants/transaction';

const initialState = () => ({
    isLoading: {},
    transactions: [],
    pageNumber: 1,
    pageSize: 25,
    totalEntities: 0,
});

const reduce = {};

reduce[transactionConstants.GET_ADDRESS_TRANSACTIONS_REQUEST] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [transactionConstants.GET_ADDRESS_TRANSACTIONS_REQUEST]: true}
});

reduce[transactionConstants.GET_ADDRESS_TRANSACTIONS_SUCCESS] = (state, action) => ({
    ...state,
    ...action.payload,
    isLoading: {...state.isLoading, [transactionConstants.GET_ADDRESS_TRANSACTIONS_REQUEST]: false}
});

reduce[transactionConstants.GET_ADDRESS_TRANSACTIONS_FAIL] = (state) => ({
    ...state,
    isLoading: {...state.isLoading, [transactionConstants.GET_ADDRESS_TRANSACTIONS_REQUEST]: false}
});

export default (state = initialState(), action) => reduce[action.type] ? reduce[action.type](state, action) : state;
