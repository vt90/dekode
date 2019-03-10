import http from 'config/http';
import {TRANSACTION_API} from 'constants/api-routes';
import {transactionConstants} from 'constants/transaction';

const getTransactionsAddress = address => http.get(`${TRANSACTION_API}/transaction/${address}`);

export const getTransactionsByAddress = (address) => async dispatch => {
    try {
        dispatch(getTransactionByAddressRequest());
        const result = await getTransactionsAddress(address);

        const transactions = result.transactions.map(({txid, vin, vout, time: timestamp}) => {
            // A bitcoin address is a sender if the address is found in the vin list
            // Otherwise the address is a receiver
            let transactionAddress = vout.find(({address: add}) => add.address === address);
            let income = true;

            if (!transactionAddress) {
                transactionAddress = vin.find(({address: add}) => add.address === address);
                income = false;
            }

            return ({
                txid,
                income,
                value: income ? transactionAddress.value : transactionAddress.vout,
                vin: vin.map(({address: add}) => ({...add})),
                vout: vout.map(({address: add}) => ({...add})),
                timestamp,
            });
        });
        dispatch(getTransactionByAddressSuccess({...result, transactions}));
    } catch (error) {
        console.log(error);
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
