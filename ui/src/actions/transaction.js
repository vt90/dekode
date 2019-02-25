import http from 'config/http';
import {TRANSACTION_API} from 'constants/api-routes';
import {transactionConstants} from 'constants/transaction';

const getTransactionsAddress = address => http.get(`${TRANSACTION_API}/transaction/${address}`);

export const getTransactionsByAddress = (address) => async dispatch => {
    try {
        dispatch(getTransactionByAddressRequest());
        const result = await getTransactionsAddress(address);
        dispatch(getTransactionByAddressSuccess(result));
    } catch (error) {
        dispatch(getTransactionByAddressFail(error));
    }
};

const getTransactionByAddressRequest = () => ({type: transactionConstants.GET_ADDRESS_TRANSACTIONS_REQUEST});
const getTransactionByAddressSuccess = payload => ({
    type: transactionConstants.GET_ADDRESS_TRANSACTIONS_SUCCESS,
    payload
});
const getTransactionByAddressFail = error => ({
    type: transactionConstants.GET_ADDRESS_TRANSACTIONS_FAIL,
    payload: error
});
