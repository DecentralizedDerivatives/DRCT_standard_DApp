import { Factory, Exchange, DRCT, UserContract } from '../ethereum';
import {
  SET_ORDER_DETAILS,
  SET_BUY_ORDER_RECEIPT,
  SET_BUY_ORDER_ERROR,
  SET_UNLIST_ORDER_RECEIPT,
  SET_UNLIST_ORDER_ERROR,
  SET_CONTRACT_CREATED,
  SET_CONTRACT_ERROR,
  SET_CONTRACT_FUNDED,
  SET_SEND_FUNDS_ERROR,
  SET_LIST_ORDER,
  SET_LIST_ORDER_ERROR,
  SET_LIST_ORDER_APPROVED,
  SET_LIST_ORDER_APPROVE_ERROR,
  SET_PROCESSING,
  SET_FETCHING_ERROR
} from './types';

import FactoryProvider from '../factoryProvider';

//TODO: This function makes no sense.  Why return an array of strings??
//Should be a single object with order details.  Right??
export const getOrderDetails = orderId => async dispatch => {
  try {
    if (!orderId) {
      return dispatch({type: SET_ORDER_DETAILS, payload: ''});
    }
    var factories = FactoryProvider.factories();
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);
    let order = await exchange.getOrder(orderId);
    let _allrows = [];
    for (var i = 0; i < factories.length; i++) {
      const factory = await Factory.at(factories[i].address);
      var orderDetail = await getOrderDetailForFactory(factory, order, orderId);
      _allrows.push(orderDetail);
    }
    dispatch({
      type: SET_ORDER_DETAILS,
      payload: _allrows
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'Get Order Details: ' + err.message.split('\n')[0]
    });
  }
};

const getOrderDetailForFactory = async (factory, order, orderId) => {
  let display = [];
  let date = await factory.token_dates.call(order[3]);
  date = new Date(date * 1000);
  date =
    date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  display =
    orderId.toString() +
    '(' +
    order[3] +
    order[1].c[0].toString() +
    '/' +
    order[2].c[0].toString() +
    '/' +
    date.toString() +
    ')';
  return display;
};

export const sendBuyOrder = (orderId, account) => async dispatch => {
  dispatch(setProcessing(true));
  dispatch({type: SET_BUY_ORDER_ERROR, payload: null });
  try {
    orderId = parseInt(orderId, 10);
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);
    const order = await exchange.getOrder(orderId);
    const _value = order[1];
    const response = await exchange.buy(orderId, {
      from: account,
      gas: 400000,
      value: _value
    });
    // console.log('RESPONSE', response)
    dispatch({
      type: SET_BUY_ORDER_RECEIPT,
      payload: {
        id: response.tx,
        orderId: orderId
      }
    });
  } catch (err) {
    // console.log('err', err.message)
    dispatch({
      type: SET_BUY_ORDER_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
  dispatch(setProcessing(false));
};

export const sendUnlistOrder = (orderId, account) => async dispatch => {
  dispatch(setProcessing(true));

  try {
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);
    const response = await exchange.unlist(orderId, {
      from: account,
      gas: 200000
    });

    dispatch({
      type: SET_UNLIST_ORDER_RECEIPT,
      payload: {
        id: response.tx,
        orderId: orderId
      }
    });
  } catch (err) {
    dispatch({
      type: SET_UNLIST_ORDER_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const sendListOrder = (formValues, account) => async dispatch => {
  dispatch(setProcessing(true));

  let { token, tokenAmount, price } = formValues;

  try {
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);

    const response = await exchange.list(token, tokenAmount, price * 1e18, {
      from: account,
      gas: 400000
    });

    dispatch({
      type: SET_LIST_ORDER,
      payload: {
        id: response.tx,
        price
      }
    });
  } catch (err) {
    dispatch({
      type: SET_LIST_ORDER_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const sendApproveOrder = (approveDetails, account) => async dispatch => {
  dispatch(setProcessing(true));

  let { token, tokenAmount } = approveDetails;

  try {
    var staticAddresses = FactoryProvider.getStaticAddresses();
    const exchange = await Exchange.at(staticAddresses.exchange);
    const drct = await DRCT.at(token);
    const allowance = await drct.allowance(account, exchange.address)
    const approvedAmount = allowance && allowance.c && allowance.c.length > 0 ? allowance.c[0] : 0
    let listedAmount = tokenAmount
    if (Number(tokenAmount) < Number(approvedAmount)) {
      const ordersList = await exchange.getUserOrders(account)
      for (let ord of ordersList) {
        let order = await exchange.getOrder(ord.c[0])
        if (order[3] === token) {
          listedAmount += order[2].c[0]
        }
      }
    }
    if (Number(listedAmount) > Number(approvedAmount)) {
      await drct.approve(exchange.address, tokenAmount, {
        from: account,
        gas: 100000
      });
    }
    dispatch({
      type: SET_LIST_ORDER_APPROVED,
      payload: {
        token,
        tokenAmount,
        approved: true
        // approveTx: response.tx
      }
    });
  } catch (err) {
    console.log('APPROVE ERROR', err)
    dispatch({
      type: SET_LIST_ORDER_APPROVE_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const sendCreateContractOrder = (
  formValues,
  account
) => async dispatch => {
  dispatch(setProcessing(true));
  
  const { duration, currency, startDate } = formValues;
  var amount = formValues.amount / 2;
  try {
    const factory = await Factory.at(currency);

    let userAddress = await factory.user_contract.call();
    const userContract = await UserContract.at(userAddress);

    let fundingAmount = 1e18 * amount;
    console.log('Variables',startDate,fundingAmount)
    const response = await userContract.Initiate(startDate, fundingAmount, {
      from: account,
      gas: 1100000,
      value: fundingAmount * 2
    });

    dispatch({
      type: SET_CONTRACT_FUNDED,
      payload: response.tx
    });
  } catch (err) {
    dispatch({
      type: SET_SEND_FUNDS_ERROR,
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
