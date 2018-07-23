import { Factory, Exchange, DRCT } from '../ethereum';
import {
  SET_CONTRACT_DETAILS,
  SET_CONTRACT_OPEN_DATES,
  SET_ORDERBOOK,
  SET_FETCH_IN_PROGRESS,
  REMOVE_FETCH_IN_PROGRESS,
  SET_FETCHING_ERROR,
  SET_RECENT_TRADES
} from './types';

import FactoryProvider from '../factoryProvider';

export const getContractDetails = (symbol) => async dispatch => {
  try {
    const provider = FactoryProvider.getFromSymbol(symbol);
    // const factory = await Factory.at(provider && provider.address ? provider.address : '');
    // const response = await factory.getVariables();
    const details = {
      contractAddress: provider.address,
      contractDuration: provider.duration,
      contractMultiplier: provider.multiplier,
      oracleAddress: provider.oracle
      // contractAddress: response[0],
      // contractDuration: response[1].c[0],
      // contractMultiplier: response[2].c[0],
      // oracleAddress: response[3]
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
};

export const getOrderBook = () => async dispatch => {
  try {
    dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK });
    // first get number of open books (tokens with open orders):
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);
    let numBooks = await exchange.getBookCount();
    var factories = FactoryProvider.factories();
    // get orders for that book:
    let _allrows = [];
    let order;
    for (let i = 0; i < numBooks; i++) {
      let book = await exchange.openBooks(i);
      // console.log('book', book)
      let date = null;
      let symbol = '???';
      for (var p = 0; p < factories.length; p++) {
        const factory = await Factory.at(factories[p].address);
        let tokenDate = await factory.token_dates.call(book);
        if (tokenDate.c && tokenDate.c.length > 0 && tokenDate.c[0] !== 0) {
          date = tokenDate.c[0];
          symbol = factories[p].symbol;
          break;
        }
      }
      let orders = await exchange.getOrders(book);
      for (let j = 0; j < orders.length; j++) {
        if (orders[j].c[0] > 0) {
          order = await exchange.getOrder(orders[j].c[0]);
          date = new Date(date * 1000);
          let orderDate = date.getUTCMonth() + 1 + '/' +
            date.getUTCDate() + '/' + date.getUTCFullYear();
          _allrows.push({
            orderId: orders[j].c[0].toString(),
            address: order[3],
            price: (order[1].c[0] / 10000).toString(),
            quantity: order[2].c[0].toString(),
            date: orderDate.toString(),
            symbol: symbol
           });
        }
      }
      _allrows.sort(function (a, b) {
        return a.orderId - b.orderId;
      });
    }
    dispatch({
      type: SET_ORDERBOOK,
      payload: _allrows
    });
    dispatch({ type: REMOVE_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'Order Book: ' + err.message.split('\n')[0]
    });
  }
};

export const getRecentTrades = () => async dispatch => {
  try {
    dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_RECENT_TRADES });
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);

    let transferEvent = await exchange.Sale(
      {},
      { fromBlock: 0, toBlock: 'latest' }
    );

    transferEvent.get(async function (err, events) {
      // console.log('events', events);
      var trades = [];
      if (events.length > 0) {
        for (let i = events.length - 1; i >= Math.max(events.length - 10, 0); i--) {
          var token = events[i].args['_token'].toString();
          // console.log('token', token);
          var drct = DRCT.at(token);
          // console.log('drct', drct);
          var factoryAddress = await drct.getFactoryAddress();
          // console.log('factoryAddress', factoryAddress);
          var provider = FactoryProvider.getFromAddress(factoryAddress);
          trades.push({
            address: token,
            volume: events[i].args['_amount'].toString(),
            price: (events[i].args['_price'] / 1e18).toString(),
            contractDuration: provider && provider.duration ? provider.duration : 0,
            contractMultiplier: provider && provider.multiplier ? provider.multiplier : 0,
            symbol: provider && provider.symbol ? provider.symbol : '??'
          });
        }
      }
      dispatch({
        type: SET_RECENT_TRADES,
        payload: trades
      });
    });
    dispatch({ type: REMOVE_FETCH_IN_PROGRESS, payload: SET_RECENT_TRADES });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'Recent Trades: ' + err.message.split('\n')[0]
    });
  }
};

export const getContractOpenDates = (currencyAddress) => async dispatch => {
  try {
    const factory = await Factory.at(currencyAddress);
    // console.log(factory);
    let openDates = {};
    const numDates = await factory.getDateCount();

    for (let i = 0; i < numDates; i++) {
      const startDate = (await factory.startDates.call(i)).c[0];
      let formattedDate = new Date(startDate * 1000);
      formattedDate = formattedDate.getUTCMonth() + 1 + '/' +
        formattedDate.getUTCDate() + '/' +
        formattedDate.getUTCFullYear();
      openDates[startDate] = formattedDate;
    }
    // console.log('opens',openDates);
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
};
