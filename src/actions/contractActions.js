import { web3 } from '../ethereum';
import {
  SET_CONTRACT_DETAILS,
  SET_ORDERBOOK,
  SET_PROCESSING_ERROR
} from './types';

export const getContractDetails = () => async dispatch => {
  try {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
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
      type: SET_PROCESSING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};

export const getOrderBook = () => async dispatch => {
  try {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
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
          let _date = await factory.token_dates.call(book);

          _date = new Date(_date * 1000);
          orderDate =
            _date.getUTCMonth() +
            1 +
            '/' +
            _date.getUTCDate() +
            '/' +
            _date.getUTCFullYear();

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
      type: SET_PROCESSING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};

export const getRecentTrades = () => async dispatch => {
  try {
    const exchange = await Exchange.deployed();
    var _trades = [];

    let transferEvent = await exchange.Sale(
      {},
      { fromBlock: 0, toBlock: 'latest' }
    );

    const logs = await transferEvent.get();

    if (logs.length === 0) {
      _trades = [['No Recent Trades', '...', '...']];
    } else {
      for (let i = logs.length - 1; i >= Math.max(logs.length - 10, 0); i--) {
        _trades.push({
          address: logs[i].args['_token'].toString(),
          volume: logs[i].args['_amount'].toString(),
          price: (logs[i].args['_price'] / 1e18).toString()
        });
      }
    }

    dispatch({
      type: SET_RECENT_TRADES,
      payload: _trades
    });
  } catch (err) {
    dispatch({
      type: SET_PROCESSING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};
