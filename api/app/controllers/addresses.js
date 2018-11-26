/**
 * Created by vladtomsa on 07/11/2018
 */
const Addresses = require('../database/models').Addresses;
const { ETH_API_KEY } = require('../../config/constants');
const Web3 = require('web3');
const axios = require('axios');
const rpcURL = ''; // Your RPC URL goes here
const web3 = new Web3(rpcURL);

const create = (data) => {
  return Addresses.create(data);
};

const getAddressInfo = async (address) => {
    const { data } = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${ETH_API_KEY}`);

    return data;
};

const getFromTransactions = async (address) => {
    console.log(`Getting transactions sent from ${address}`);
    const { result } = await getAddressInfo(address);

    return result.filter((trs) => trs.from.toLowerCase() === address.toLowerCase());
};

const getToTransactions = async (address) => {
    console.log(`Getting transactions received by ${address}`);
    const { result } = await getAddressInfo(address);

    return result.filter((trs) => trs.to.toLowerCase() === address.toLowerCase());
};

const getTransactionsFlow = async (params) => {
    try {
        const {address, levelsBefore, levelsAfter, blockchainId} = params;

        const addedAddresses = [];  // keep track of all addresses that have been analysed
        const nodes = [];           // data visualisation
        const transactions = [];    // all transactions

        nodes.push([{ id: address }]);
        addedAddresses.push(address);

        let before = levelsBefore;
        let after = levelsAfter;

        while (before > 0) {
            const addresses = nodes[0];
            const levelNodes = [];

            // cannot use forEach for async operations
            for (let i = 0; i < addresses.length; i++) {
                const { id } = addresses[i];

                const beforeTransactions = await getToTransactions(id);

                beforeTransactions.forEach((trs) => {
                    const isAddressAdded = addedAddresses.find((add) => add.toLowerCase() === trs.from.toLowerCase());

                    if (!isAddressAdded) {
                        addedAddresses.push(trs.from);
                        levelNodes.push({ id: trs.from });
                    }

                    transactions.push({
                        ...trs,
                        value: parseFloat(web3.utils.fromWei(trs.value, 'ether')),
                    });
                })
            }

            nodes.unshift(levelNodes);

            before--;
        }

        while (after > 0) {
            const addresses = nodes[nodes.length - 1];
            const levelNodes = [];

            // cannot use forEach for async operations
            for (let i = 0; i < addresses.length; i++) {
                const { id } = addresses[i];

                const afterTransactions = await getFromTransactions(id);

                afterTransactions.forEach((trs) => {
                    const isAddressAdded = addedAddresses.find((add) => add.toLowerCase() === trs.to.toLowerCase());

                    if (!isAddressAdded) {
                        addedAddresses.push(trs.to);
                        levelNodes.push({ id: trs.to });
                    }

                    transactions.push({
                        ...trs,
                        value: parseFloat(web3.utils.fromWei(trs.value, 'ether')),
                    });
                })
            }

            nodes.push(levelNodes);

            after--;
        }

        return {
            nodes,
            transactions,
        };
    }
    catch (e) {
        console.log(e);
        throw TypeError(`Error creating transactions flow for the fallowing address: ${params.address}`);
    }
};

const list = (params) => {
    return Addresses.findAll();
};

module.exports = {
    create,
    getTransactionsFlow,
    list,
};