import { Factory, Exchange } from '../ethereum';
import {
  SET_CONTRACT_DETAILS,
  SET_CONTRACT_OPEN_DATES,
  SET_ORDERBOOK,
  SET_PROCESSING,
  SET_FETCHING_ERROR,
  SET_RECENT_TRADES
} from './types';

export const getContractDetails = () => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const factory = await Factory.at(
      '0x8822b11262fb2f6c201e6fed8a3098b32851cc42'
    );

    const response = await factory.getVariables();

    const details = {
      contractAddress: response[0],
      contractDuration: response[1].c[0],
      contractMultiplier: response[2].c[0],
      oracleAddress: response[3]
    };

    dispatch({
      type: SET_CONTRACT_DETAILS,
      payload: details
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
  dispatch(setProcessing(false));
};

export const getOrderBook = () => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const factory = await Factory.at(
      '0x8822b11262fb2f6c201e6fed8a3098b32851cc42'
    );

    // first get number of open books (tokens with open orders):
    let exchange = await Exchange.deployed();
    let numBooks = await exchange.getBookCount();

    // get orders for that book:
    let _allrows = [];
    let order;
    for (let i = 0; i < numBooks; i++) {
      let book = await exchange.openBooks(i);
      let orders = await exchange.getOrders(book);
      for (let j = 0; j < orders.length; j++) {
        if (orders[j].c[0] > 0) {
          order = await exchange.getOrder(orders[j].c[0]);
          let date = await factory.token_dates.call(book);

          date = new Date(date * 1000);
          let orderDate =
            date.getUTCMonth() +
            1 +
            '/' +
            date.getUTCDate() +
            '/' +
            date.getUTCFullYear();

          _allrows.push({
            orderId: orders[j].c[0].toString(),
            address: order[3],
            price: (order[1].c[0] / 10000).toString(),
            quantity: order[2].c[0].toString(),
            date: orderDate.toString()
          });
        }
      }
    }

    dispatch({
      type: SET_ORDERBOOK,
      payload: _allrows
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'Order Book: ' + err.message.split('\n')[0]
    });
  }
  dispatch(setProcessing(false));
};

export const getRecentTrades = () => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const exchange = await Exchange.deployed();

    let transferEvent = await exchange.Sale(
      {},
      { fromBlock: 0, toBlock: 'latest' }
    );

    transferEvent.get(function (err, events) {
      var trades = [];
      if (events.length > 0) {
        for (let i = events.length - 1; i >= Math.max(events.length - 10, 0); i--) {
          trades.push({
            address: events[i].args['_token'].toString(),
            volume: events[i].args['_amount'].toString(),
            price: (events[i].args['_price'] / 1e18).toString(),
            symbol: '????' // TODO:  How can Symbol be determined from returned events?
          });
        }
      }
      dispatch({
        type: SET_RECENT_TRADES,
        payload: trades
      });
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'Recent Trades: ' + err.message.split('\n')[0]
    });
  }
  dispatch(setProcessing(false));
};

export const getContractOpenDates = (address) => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const factory = await Factory.at(address);
    console.log(factory);
    let openDates = [];
    const numDates = await factory.getDateCount();

    for (let i = 0; i < numDates; i++) {
      const startDates = (await factory.startDates.call(i)).c[0];
      let date = new Date(startDates * 1000);
      date = date.getUTCMonth() + 1 + '/' +
        date.getUTCDate() + '/' +
        date.getUTCFullYear();
      openDates.push(date);
    }
    console.log('opens',openDates);
    dispatch({
      type: SET_CONTRACT_OPEN_DATES,
      payload: openDates
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'Contract Open Dates: ' + err.message.split('\n')[0]
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
