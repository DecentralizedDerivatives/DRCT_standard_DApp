import { Factory, Exchange, DRCT, Oracle } from '../ethereum';
import {
  SET_CONTRACT_DETAILS,
  SET_CONTRACT_OPEN_DATES,
  SET_CONTRACT_START_PRICE,
  SET_ORDERBOOK,
  SET_FETCH_IN_PROGRESS,
  REMOVE_FETCH_IN_PROGRESS,
  SET_FETCHING_ERROR,
  SET_RECENT_TRADES
} from './types';

import FactoryProvider from '../factoryProvider';
const moment = require('moment');

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
    return details;
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};

export const getStartDatePrice = (oracleAddress, startDate) => async dispatch => {
  try {
    const oracle = await Oracle.at(oracleAddress)
    var data = await oracle.retrieveData(startDate);
    dispatch({
      type: SET_CONTRACT_START_PRICE,
      payload: data.c[0]
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
}
export const getOrderBook = (isSilent) => async dispatch => {
  try {
    if (!isSilent) { dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK }); };
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);
    let numBooks = await exchange.getBookCount();
    var factories = FactoryProvider.factories();
    let _allrows = [];
    for (let i = 0; i < numBooks; i++) {
      let book = await exchange.openBooks(i);
      // console.log('book', book)
      for (var p = 0; p < factories.length; p++) {
        const factory = await Factory.at(factories[p].address);
        // console.log('factory', factories[p].symbol);
        let tokenDate = await factory.token_dates.call(book);
        // console.log('tokenDate', tokenDate)
        if (tokenDate.c[0] === 0) { continue }
        let orders = await exchange.getOrders(book);
        // console.log('orders', orders)
        for (let j = 0; j < orders.length; j++) {
          if (orders[j].c[0] > 0) {
            let order = await exchange.getOrder(orders[j].c[0]);
            // console.log('order', order)
            let tokenType = (await factory.getTokenType(order[3])).c[0];
            let date = new Date(tokenDate.c[0] * 1000);
            let startDate = new Date();
            startDate.setDate(date.getDate() + 1);
            var todayMinusSixDays = new Date();
            todayMinusSixDays.setDate(todayMinusSixDays.getDate() - 6);
            if (date > todayMinusSixDays) {
              let orderDate = startDate.getUTCMonth() + 1 + '/' +
                startDate.getUTCDate() + '/' + startDate.getUTCFullYear();
              var precisePrice = parseFloat(order[1].c[0]/10000).toFixed(5);
              _allrows.push({
                orderId: orders[j].c[0].toString(),
                address: order[3],
                price: precisePrice,
                quantity: order[2].c[0].toString(),
                date: orderDate.toString(),
                symbol: factories[p].symbol,
                tokenType: tokenType === 1 ? 'Short' : 'Long'
               });
            }
          }
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

export const getRecentTrades = (isSilent) => async dispatch => {
  try {
    if (!isSilent) { dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_RECENT_TRADES }); };
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
          const factory = await Factory.at(factoryAddress);
          let tokenType = (await factory.getTokenType(token)).c[0];
          // console.log('factoryAddress', factoryAddress);
          var provider = FactoryProvider.getFromAddress(factoryAddress);
          var precisePrice = parseFloat(events[i].args['_price']/1e18).toFixed(5);
          trades.push({
            address: token,
            volume: events[i].args['_amount'].toString(),
            price: precisePrice,
            contractDuration: provider && provider.duration ? provider.duration : 0,
            contractMultiplier: provider && provider.multiplier ? provider.multiplier : 0,
            symbol: provider && provider.symbol ? provider.symbol : '??',
            tokenType: tokenType === 1 ? 'Short' : 'Long'
          });
        }
      }
      dispatch({
        type: SET_RECENT_TRADES,
        payload: trades
      });
      dispatch({ type: REMOVE_FETCH_IN_PROGRESS, payload: SET_RECENT_TRADES });
    });
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
      var momentDate = moment(formattedDate);
      var pastDate = moment().subtract(5, 'days').startOf('day');
      if (momentDate.isBefore(pastDate)) { continue }
      formattedDate = formattedDate.getUTCMonth() + 1 + '/' +
        formattedDate.getUTCDate() + '/' +
        formattedDate.getUTCFullYear();
      openDates[startDate] = formattedDate;
    }
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
