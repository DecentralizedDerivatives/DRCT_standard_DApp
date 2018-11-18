import { Factory, Exchange, DRCT } from '../ethereum';
import QClient from "../buidlHub/QueryClient.js"
import {
  SET_CONTRACT_DETAILS,
  SET_CONTRACT_OPEN_DATES,
  SET_ORDERBOOK,
  SET_FETCH_IN_PROGRESS,
  REMOVE_FETCH_IN_PROGRESS,
  SET_FETCHING_ERROR,
  SET_RECENT_TRADES
} from './types';

import api from '../api';
import { getStartDatePrice } from './common';
import FactoryProvider from '../factoryProvider';
const moment = require('moment');

let apiKey = '32b30a51240144118d5ce7a999d25ce2';// process.env["apiKey"];
if(!apiKey) {
  throw new Error("Missing API key in environment");
}

let client = new QClient({
  apiKey

});
let qb = client.queryBuilder().offset(0).pageSize(5);

export const getContractDetails = (symbol, startDate) => async dispatch => {
  try {
    const provider = FactoryProvider.getFromSymbol(symbol);
    const details = {
      contractAddress: provider.address,
      contractDuration: provider.duration,
      contractMultiplier: provider.multiplier,
      oracleAddress: provider.oracle
    };
    let startPrice = await getStartDatePrice(details.oracleAddress, startDate)
    details.contractStartPrice = Number(startPrice || 0)
    details.contractCurrentPrice = 0
    details.contractGain = 0
    if (details.contractStartPrice > 0) {
      const priceData = await api[provider.type].get();
      let currentPrice = priceData[priceData.length - 1][1]
      details.contractCurrentPrice = currentPrice
      details.contractGain = ((details.contractCurrentPrice - details.contractStartPrice) / details.contractStartPrice) * 100 * Number(provider.multiplier)
    }
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
export const getOrderBook = (isSilent) => async dispatch => {
          let _allrows = [];
  try {
    try{
       let order = qb.query("OrderBook");
        order.logEvent("OrderPlaced").groupByAttribute(1);
        order.logEvent("Sale").withIndex(1).groupByAttribute(1);
        order.logEvent("OrderRemoved").groupByAttribute(1);
        order.groupLimit(1);
        let r = await qb.execute();
        console.log('r',r);
        let res = r.data.OrderBook.hits;
        console.log('res',res)
        for(var i = res.length-1;i>=0;i--){
          let res2 = res[i].event.params;
          console.log(res2);
            var drct = await DRCT.at(res2._token);
            var factoryAddress = await drct.getFactoryAddress();
            const factory = await Factory.at(factoryAddress);
            let tokenDate = await factory.token_dates.call(res2._token);
            let date = new Date(tokenDate.c[0] * 1000);
            let orderDate = date.getUTCMonth() + 1 + '/' +
            date.getUTCDate() + '/' + date.getUTCFullYear();
            let endDate = moment(date).utc().add(6, 'days')
            if (moment().utc().isSameOrBefore(endDate)) {
                let tokenType = (await factory.getTokenType(res2._token)).c[0];
                let symbol = FactoryProvider.getSymbolFromAddress(factoryAddress);
                const provider = FactoryProvider.getFromSymbol(symbol);
                let startPrice = await getStartDatePrice(provider.oracle, orderDate)
                let contractGain = 0
                if (startPrice > 0) {
                  const priceData = await api[provider.type].get();
                  let currentPrice = priceData[priceData.length - 1][1]
                  contractGain = ((currentPrice - startPrice) / startPrice) * 100 * Number(provider.multiplier) * (tokenType === 1 ? -1 : 1)
                }
              _allrows.push({
                orderId: res2._orderId,
                creatorAddress: res2._sender,
                address: res2._token,
                price: res2._price,
                quantity: res2._amount,
                date: orderDate.toString(),
                symbol: symbol,
                contractGain: contractGain,
                tokenType: (tokenType === 1 ? 'Short' : 'Long')
               });
            }
          }
            console.log('allrows',_allrows);
            dispatch({
              type: SET_ORDERBOOK,
              payload: _allrows
            });
            dispatch({ type: REMOVE_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK });
    }
    catch{
      console.log('Database didnt work');
        if (!isSilent) { dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK }); };
        var staticAddresses = FactoryProvider.getStaticAddresses();
        const exchange = await Exchange.at(staticAddresses.exchange);
        let numBooks = await exchange.getBookCount();
        var factories = FactoryProvider.factories();
        for (let i = 0; i < numBooks; i++) {
          let book = await exchange.openBooks(i);
          for (var p = 0; p < factories.length; p++) {
            const factory = await Factory.at(factories[p].address);
            let tokenDate = await factory.token_dates.call(book);
            if (tokenDate.c[0] === 0) { continue }
            let orders = await exchange.getOrders(book);
            for (let j = 0; j < orders.length; j++) {
              if (orders[j].c[0] > 0) {
                let order = await exchange.getOrder(orders[j].c[0]);
                let tokenType = (await factory.getTokenType(order[3])).c[0];
                let date = new Date(tokenDate.c[0] * 1000);
                let endDate = moment(date).utc().add(6, 'days')
                if (moment().utc().isSameOrBefore(endDate)) {
                  let orderDate = moment(date).utc().format('MM/DD/YYYY')
                  var precisePrice = parseFloat(order[1].c[0]/10000).toFixed(5);
                  let symbol = factories[p].symbol
                  const provider = FactoryProvider.getFromSymbol(symbol);
                  let startPrice = await getStartDatePrice(provider.oracle, orderDate)
                  let contractGain = 0
                  if (startPrice > 0) {
                    const priceData = await api[provider.type].get();
                    let currentPrice = priceData[priceData.length - 1][1]
                    contractGain = ((currentPrice - startPrice) / startPrice) * 100 * Number(provider.multiplier) * (tokenType === 1 ? -1 : 1)
                  }
                  _allrows.push({
                    orderId: orders[j].c[0].toString(),
                    creatorAddress: order[0],
                    address: order[3],
                    price: precisePrice,
                    quantity: order[2].c[0].toString(),
                    date: orderDate.toString(),
                    symbol: factories[p].symbol,
                    contractGain: contractGain,
                    tokenType: (tokenType === 1 ? 'Short' : 'Long')
                   });
                }
              }
            }
          }
          _allrows.sort(function (a, b) {
            return a.orderId - b.orderId;
          });
        }
      console.log('allrows',_allrows);
      dispatch({
        type: SET_ORDERBOOK,
        payload: _allrows
      });
      dispatch({ type: REMOVE_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK });
    }
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
      var trades = [];

      if (events.length > 0) {
        for (let i = events.length - 1; i >= Math.max(events.length - 10, 0); i--) {
          var token = events[i].args['_token'].toString();
          var drct = DRCT.at(token);
          var factoryAddress = await drct.getFactoryAddress();
          const factory = await Factory.at(factoryAddress);
          let tokenDate = await factory.token_dates.call(token);
          let date = new Date(tokenDate.c[0] * 1000);
          let orderDate = date.getUTCMonth() + 1 + '/' +
            date.getUTCDate() + '/' + date.getUTCFullYear();
          let tokenType = (await factory.getTokenType(token)).c[0];
          var provider = FactoryProvider.getFromAddress(factoryAddress);
          var precisePrice = parseFloat(events[i].args['_price']/1e18).toFixed(5);
          trades.push({
            address: token,
            volume: events[i].args['_amount'].toString(),
            price: precisePrice,
            orderDate: orderDate,
            contractDuration: provider && provider.duration ? provider.duration : 7,
            contractMultiplier: provider && provider.multiplier ? provider.multiplier : 1,
            symbol: provider && provider.symbol ? provider.symbol : '',
            tokenType: tokenType === 1 ? 'Short' : 'Long',
            date: date.toString()
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
