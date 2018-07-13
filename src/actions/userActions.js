import { Factory, Exchange, web3, DRCT, Wrapped } from '../ethereum';
import {
  SET_USER_ACCOUNT,
  SET_USER_BALANCE,
  SET_USER_TRANSACTIONS,
  SET_USER_POSITIONS,
  SET_USER_TOKENS,
  SET_SELECTED_TOKEN,
  SET_USER_ORDERS,
  // SET_USER_ORDER_LABELS,
  SET_CURRENT,
  SET_PROCESSING,
  SET_FETCHING_ERROR,
  SET_CASHOUT_RECEIPT,
  SET_CASHOUT_ERROR
} from './types';

import FactoryProvider from '../factoryProvider';

export const getUserAccount = () => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const userAccounts = await web3.eth.getAccounts();

    dispatch({
      type: SET_USER_ACCOUNT,
      payload: userAccounts[0]
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const getUserBalance = () => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const wrapped = await Wrapped.deployed();
    const accounts = await web3.eth.getAccounts();
    let _res = await wrapped.balanceOf(accounts[0]);

    dispatch({
      type: SET_USER_BALANCE,
      payload: _res.c[0]
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const getUserTransactions = userAccount => async dispatch => {
  dispatch(setProcessing(true));
  try {
    //const exchange = await Exchange.deployed();
    var factories = FactoryProvider.factories();
    var transactions = [];
    for (var i = 0; i < factories.length; i++) {
      const factory = await Factory.at(factories[i].address);
      var events = await getContractCreationEvents(factory, userAccount);
      transactions = transactions.concat(events);
    };
    //     //Sale: await exchange.Sale({}, {fromBlock:0, toBlock: 'latest'}),
    //     //OrderPlaced: await exchange.OrderPlaced({}, {fromBlock:0, toBlock: 'latest'}),
    //     //OrderRemoved: await exchange.OrderRemoved({}, {fromBlock:0, toBlock: 'latest'}),
    //     ContractCreation: await factory.ContractCreation(
    //       {},
    //       { fromBlock: 0, toBlock: 'latest' }
    //     )
    //     //Transfer: await drct.Transfer({}, {fromBlock:0, toBlock: 'latest'}),
    //     //Approval: await drct.Approval({}, {fromBlock:0, toBlock: 'latest'})
    dispatch({
      type: SET_USER_TRANSACTIONS,
      payload: transactions
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'User Transactions: ' + err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

const getContractCreationEvents = async (factory, userAccount) => {
  let transferEvent = await factory.ContractCreation(
    {},
    { fromBlock: 0, toBlock: 'latest' }
  );
  return new Promise((resolve, reject) => {
    transferEvent.get(function (err, logs) { // .get() does not support async/await
      try {
        let trades = [];
        for (let i = logs.length - 1; i >= Math.max(logs.length - 10, 0); i--) {
          if (logs[i].args['_sender'].toUpperCase() === userAccount.toUpperCase()) {
            trades.push({title: 'ContractCreation', hash: logs[i].transactionHash});
          }
        }
        resolve(trades);
      } catch (err) {
        reject(err);
      }
    });
  });
}

export const getUserPositions = userAccount => async dispatch => {
  dispatch(setProcessing(true));
  try {
    var factories = FactoryProvider.factories();
    var positions = []
    for (var i = 0; i < factories.length; i++) {
      var data = await getPositionsForFactory(factories[i], userAccount);
      positions = positions.concat(data);
    };
    dispatch({
      type: SET_USER_POSITIONS,
      payload: positions
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'User Positions: ' + err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

const getPositionsForFactory = async (provider, userAccount) => {
  const factory = await Factory.at(provider.address);
  let positions = [];
  const numDates = await factory.getDateCount();
  for (let i = 0; i < numDates; i++) {
    const startDate = (await factory.startDates.call(i)).c[0];
    const tokenAddresses = await factory.getTokens(startDate);
    for (let p = 0; p < tokenAddresses.length; p++) {
      let drct = await DRCT.at(tokenAddresses[p]);
      let balance = await drct.balanceOf(userAccount);
      if (balance.c[0] > 0) {
        let date = new Date(startDate * 1000);
        date = date.getUTCMonth() + 1 + '/' +
          date.getUTCDate() + '/' +
          date.getUTCFullYear();
        positions.push({
          address: tokenAddresses[p],
          balance: balance.c[0].toString(),
          date: date.toString(),
          symbol: provider.symbol,
          contractDuration: 0, // TODO: this.state.contractDuration,
          contractMultiplier: 0, // TODO: this.state.contractMultiplier
        });
      }
    }
  }
  return positions;
}

export const getUserTokenPositions = userAccount => async dispatch => {
  dispatch(setProcessing(true));
  try {
    var factories = FactoryProvider.factories();
    var tokens = []
    for (var i = 0; i < factories.length; i++) {
      const factory = await Factory.at(factories[i].address);
      var data = await getTokenPositionsForFactory(factory, userAccount);
      tokens = tokens.concat(data);
    }
    dispatch({
      type: SET_USER_TOKENS,
      payload: tokens
    });
    dispatch({
      type: SET_SELECTED_TOKEN,
      payload: {
        selectedToken: tokens.length > 0 ? tokens[0] : null
      }
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'User Token Positions: ' + err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

const getTokenPositionsForFactory = async (factory, userAccount) => {
  const numDates = await factory.getDateCount();
  let tokens = [];
  for (let i = 0; i < numDates; i++) {
    const startDates = (await factory.startDates.call(i)).c[0];
    const tokenAddresses = await factory.getTokens(startDates);
    let _date = new Date(startDates * 1000);
    _date = _date.getMonth() + 1 + '/' +
      _date.getDate() + '/' +
      _date.getFullYear();

    for (let p = 0; p < tokenAddresses.length; p++) {
      const drct = await DRCT.at(tokenAddresses[p]); //Getting contract
      const balance = (await drct.balanceOf(userAccount)).c[0]; //Getting balance of token
      if (balance > 0) {
        tokens.push(`${tokenAddresses[p]}(${balance}/${_date})`); //Pushing token address + balance/date
      };
    }
  }
  return tokens;
};
export const getUserOrders = userAccount => async dispatch => {
  dispatch(setProcessing(true));
  try {
    var factories = FactoryProvider.factories();
    var orders = []
    for (var i = 0; i < factories.length; i++) {
      var data = await getOrdersForFactory(factories[i], userAccount);
      orders = orders.concat(data);
    }
    dispatch({
      type: SET_USER_ORDERS,
      payload: {
        userOrders: orders
      }
    });
    dispatch({
      type: SET_CURRENT,
      payload: {
        selectedToken: orders.length > 0 ? orders[0].row : null,
        selectedOrderID: orders.length > 0 ? orders[0].id : null
      }
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'User Orders: ' + err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};
const getOrdersForFactory = async (factory, userAccount) => {
  const exchange = await Exchange.deployed();
  const books = await exchange.getUserOrders.call(userAccount); //Gets all listed order ids
  const allOrders = []; //Contains all information for each order
  for (let i = 0; i < books.length; i++) {
    const order = {};
    order.id = books[i].c[0];
    order.info = await exchange.getOrder(order.id); //Getting order info by order Id (returns array);
    order.owner = order.info[0];
    order.price = order.info[1].c[0] / 10000; //divided by 10000 to fix offset
    order.owned = order.info[2].c[0];
    order.address = order.info[3];
    var date = await factory.token_dates.call(order.address);
    date = new Date(date * 1000);
    order.date = date.getMonth() + 1 + '/' +
      date.getDate() + '/' +
      date.getFullYear();
    order.row = `${order.address}(${order.owned}/${order.date})`;
    allOrders.push(order);
  }
  return allOrders;
}

export const sendCashOutRequest = (amount, account) => async dispatch => {
  dispatch(setProcessing(true));

  try {
    const wrapped = await Wrapped.deployed();
    const response = await wrapped.withdraw(amount, {
      from: account,
      gas: 4000000
    });

    dispatch({
      type: SET_CASHOUT_RECEIPT,
      payload: {
        id: response.tx,
        amount: amount
      }
    });
  } catch (err) {
    dispatch({
      type: SET_CASHOUT_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const setProcessing = status => {
  return {
    type: SET_PROCESSING,
    payload: status
  };
};
