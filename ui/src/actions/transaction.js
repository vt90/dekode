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

export const getAddressFlow = (address) => async dispatch => {
    try {
        dispatch(getAddressFlowRequest());
        const result = await getTransactionsAddress(address);
        const chartData = {
            transactions: [...result.transactions],
        };
        const nodes = [[], [], []];
        const uniqNodes = {};
        result.transactions.forEach(({txid, vin, vout}) => {
            let isLevelZero = false;
            const levelZero = [];
            vin.forEach((add) => {
                if (add.address) {
                    if (add.address.address === address) {
                        isLevelZero = true;
                    }
                    if (!uniqNodes[add.address.address]) {
                        levelZero.push(add.address.address);
                        uniqNodes[add.address.address] = true
                    }
                }
            });

            const levelOne = [];
            vout.forEach(address => {
                if (address.address.address) {
                    if (!uniqNodes[address.address.address]) {
                        levelOne.push(address.address.address);
                        uniqNodes[address.address.address] = true
                    }
                }
            });

            if (isLevelZero) {
                nodes[1].push(...levelZero);
                nodes[2].push(...levelOne);
            } else {
                nodes[0].push(...levelZero);
                nodes[1].push(...levelOne);
            }
        });

        chartData.nodes = nodes;

        dispatch(getAddressFlowSuccess(chartData));
    } catch (error) {
        console.log(error);
        dispatch(getAddressFlowFail(error));
    }
};

const getAddressFlowRequest = () => ({type: transactionConstants.GET_ADDRESS_FLOW_REQUEST});
const getAddressFlowSuccess = payload => ({
    type: transactionConstants.GET_ADDRESS_FLOW_SUCCESS,
    payload
});
const getAddressFlowFail = error => ({
    type: transactionConstants.GET_ADDRESS_FLOW_FAIL,
    payload: error
});
