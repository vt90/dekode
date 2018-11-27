/**
 * Created by vladtomsa on 07/11/2018
 */
const Addresses = require('../database/models').Addresses;
const math = require('mathjs');
const { ETH_API_KEY } = require('../../config/constants');
const Web3 = require('web3');
const axios = require('axios');
const rpcURL = ''; // Your RPC URL goes here
const web3 = new Web3(rpcURL);

const create = (data) => {
  return Addresses.create(data);
};

const extractValue = (value) => {
  // const bigValue = math.bignumber(value).toFixed();

  const weiToEther = web3.utils.fromWei(`${value}`, 'ether');

  return parseFloat(weiToEther);
};

const getAddressDetails = async ({ address }) => {
  try {
    const balance = await getAddressBalance(address);
    const transactions = await getTransactionsByAddress(address);

    return {
      balance,
      transactions,
    };
  }
  catch (e) {
    console.log(e);
    throw TypeError(`Error retrieving address details for: ${params.address}`);
  }
};

const getAddressBalance = async (address) => {
  const url = `https://api.blockcypher.com/v1/eth/main/addrs/${address}/balance`;
  const { data } = await axios.get(url);

  console.log('Balance: ', data.final_balance);
  const weiToEther = web3.utils.fromWei(`${data.final_balance}`, 'ether');

  console.log('Ether: ', weiToEther);

  try {
    return {
      ...data,
      total_received: extractValue(data.total_received),
      total_sent: extractValue(data.total_sent),
      balance: extractValue(data.balance),
      unconfirmed_balance: extractValue(data.unconfirmed_balance),
      final_balance: extractValue(data.final_balance),
    };
  }
  catch (e) {
    console.log(e);
    console.log(data);
    return data;
  }
};

const getTransactionsByAddress = async (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=2000&sort=asc&apikey=${ETH_API_KEY}`;
    const { data: { result }  } = await axios.get(url);

    return result.map((transaction) => {
      let value = transaction.value;

      try {
       value = extractValue(transaction.value);
      }
      catch (e) {
        console.log(e);
        console.log(transaction);
      }

      return {
        ...transaction,
        value,
      };
    });
};

const getFromTransactions = async (address) => {
    console.log(`Getting transactions sent from ${address}`);
    const transactions = await getTransactionsByAddress(address);

    return transactions.filter((trs) => trs.from.toLowerCase() === address.toLowerCase());
};

const getToTransactions = async (address) => {
    console.log(`Getting transactions received by ${address}`);
    const transactions = await getTransactionsByAddress(address);

    return transactions.filter((trs) => trs.to.toLowerCase() === address.toLowerCase());
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

                    transactions.push(trs);
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

                    transactions.push(trs);
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
    getAddressDetails,
    getTransactionsFlow,
    list,
};
