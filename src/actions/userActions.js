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
    var transactions = []
    factories.forEach(async (item, index) => {
      const factory = await Factory.at(item.address);
      var events = await getContractCreationEvents(factory, userAccount);
      transactions = transactions.concat(events);
    });
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
  let trades = [];
  return new Promise((resolve, reject) => {
    transferEvent.get(function (err, logs) { // .get() does not support async/await
      try {
        for (let i = logs.length - 1; i >= Math.max(logs.length - 10, 0); i--) {
          if (
            logs[i].args['_sender'].toUpperCase() === userAccount.toUpperCase()
          ) {
            trades.push({title: 'ContractCreation', hash: logs[i].transactionHash});
          }
        }
        trades = trades.length === 0 ? [] : trades;
        resolve(trades);
      } catch (err) {
        reject('Contract Creation Event: ' + err.message.split('\n')[0]);
      }
    });
  });
}

export const getUserPositions = userAccount => async dispatch => {
  dispatch(setProcessing(true));
  try {
    var factories = FactoryProvider.factories();
    var positions = []
    factories.forEach(async (item, index) => {
      const factory = await Factory.at(item.address);
      var data = await getPositionsForFactory(factory, userAccount);
      positions = positions.concat(data);
    });

    positions = positions.length === 0 ? [] : positions;

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

const getPositionsForFactory = async (factory, userAccount) => {
  let allRows = [];
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
        allRows.push({
          address: tokenAddresses[p],
          balance: balance.c[0].toString(),
          date: date.toString(),
          symbol: 'BTC/USD',
          contractDuration: 0, // TODO: this.state.contractDuration,
          contractMultiplier: 0, // TODO: this.state.contractMultiplier
        });
      }
    }
  }
  return allRows;
}

export const getUserTokenPositions = userAccount => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const numDates = await factory.getDateCount();
    let allRows = [];
    // let openDates = [];
    for (let i = 0; i < numDates; i++) {
      const startDates = (await factory.startDates.call(i)).c[0];
      const tokenAddresses = await factory.getTokens(startDates);
      let _date = new Date(startDates * 1000);
      _date =
        _date.getMonth() +
        1 +
        '/' +
        _date.getDate() +
        '/' +
        _date.getFullYear();

      for (let p = 0; p < tokenAddresses.length; p++) {
        const drct = await DRCT.at(tokenAddresses[p]); //Getting contract
        const balance = (await drct.balanceOf(userAccount)).c[0]; //Getting balance of token
        if (balance > 0) {
          allRows.push(`${tokenAddresses[p]}(${balance}/${_date})`); //Pushing token address + balance/date
        }
      }
    }

    const _userTokens = allRows ? allRows : ['No Current Position'];

    if (allRows) {
      dispatch({
        type: SET_SELECTED_TOKEN,
        payload: {
          selectedToken: allRows[0]
        }
      });
    }

    dispatch({
      type: SET_USER_TOKENS,
      payload: {
        userTokens: _userTokens
      }
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const getUserOrders = userAccount => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const exchange = await Exchange.deployed();
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );

    const books = await exchange.getUserOrders.call(userAccount); //Gets all listed order ids
    const allOrders = []; //Contains all information for each order
    const allOrderLabels = []; //Contains only what's going to be displayed in dropdown

    for (let i = 0; i < books.length; i++) {
      //Getting all info for orders in book and storing them in an object
      const order = {};
      order.id = books[i].c[0];
      order.info = await exchange.getOrder(order.id); //Getting order info by order Id (returns array);
      order.owner = order.info[0];
      order.price = order.info[1].c[0] / 10000; //divided by 10000 to fix offset
      order.owned = order.info[2].c[0];
      order.address = order.info[3];
      order.date = await factory.token_dates.call(order.address);
      order.date = new Date(order.date * 1000);
      order.date =
        order.date.getMonth() +
        1 +
        '/' +
        order.date.getDate() +
        '/' +
        order.date.getFullYear();
      order.row = `${order.address}(${order.owned}/${order.date})`;
      allOrders.push(order);
      allOrderLabels.push(order.row);
    }

    if (allOrderLabels.length) {
      dispatch({
        type: SET_USER_ORDERS,
        payload: {
          userOrderLabels: allOrderLabels,
          userOrders: allOrders
        }
      });

      dispatch({
        type: SET_CURRENT,
        payload: {
          selectedToken: allOrderLabels[0],
          selectedOrderID: allOrders[0].id
        }
      });
    } else {
      dispatch({
        type: SET_CURRENT,
        payload: {
          selectedToken: 'No orders listed',
          selectedOrderID: ''
        }
      });
    }
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

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
