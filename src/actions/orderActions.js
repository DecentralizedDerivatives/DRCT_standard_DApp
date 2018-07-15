import { Factory, Exchange, DRCT, UserContract } from '../ethereum';
import {
  SET_ORDER_DETAILS,
  SET_SELECTED_TOKEN,
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
  dispatch(setProcessing(true));
  try {
    if (!orderId) {
      dispatch({type: SET_SELECTED_TOKEN, payload: ''});
      return dispatch({type: SET_ORDER_DETAILS, payload: ''});
    }
    var factories = FactoryProvider.factories();
    const exchange = await Exchange.deployed();
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

    if (_allrows.length === 1) {
      dispatch({
        type: SET_SELECTED_TOKEN,
        payload: order[3]
      });
    }
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'Get Order Details: ' + err.message.split('\n')[0]
    });
  }
  dispatch(setProcessing(false));
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

  try {
    const exchange = await Exchange.deployed();
    const order = await exchange.getOrder(orderId);
    const _value = order[1];
    const response = await exchange.buy(order, {
      from: account,
      gas: 4000000,
      value: _value
    });

    dispatch({
      type: SET_BUY_ORDER_RECEIPT,
      payload: {
        id: response.tx,
        orderId: orderId
      }
    });
  } catch (err) {
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
    const exchange = await Exchange.deployed();
    const response = await exchange.unlist(orderId, {
      from: account,
      gas: 4000000
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

  let { token, price, amount } = formValues;

  try {
    const exchange = await Exchange.deployed();

    const response = await exchange.list(token, amount, price * 1e18, {
      from: account,
      gas: 4000000
    });

    dispatch({
      type: SET_LIST_ORDER,
      payload: {
        id: response.tx,
        token,
        price,
        amount
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

  let { selectedToken, amount } = approveDetails;

  try {
    const exchange = await Exchange.deployed();

    selectedToken = selectedToken.split('(')[0].replace(/['"]+/g, '');

    const drct = await DRCT.at(selectedToken);

    const response = await drct.approve(exchange.address, amount, {
      from: account,
      gas: 4000000
    });

    dispatch({
      type: SET_LIST_ORDER_APPROVED,
      payload: response.tx
    });
  } catch (err) {
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

  const { duration, currency, startDate, amount } = formValues;
  try {
    const factory = await Factory.at(currency);

    let date = Math.floor(new Date(startDate).getTime() / 1000);
    date = date - (date % 86400);

    const response = await factory.deployContract(date, {
      from: account,
      gas: 4000000
    });

    dispatch({
      type: SET_CONTRACT_CREATED,
      payload: {
        id: response.tx,
        address: response.logs[0].args._created,
        duration,
        currency,
        startDate,
        amount
      }
    });
  } catch (err) {
    dispatch({
      type: SET_CONTRACT_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const sendSendFundsOrder = (
  sendFundsDetails,
  account
) => async dispatch => {
  dispatch(setProcessing(true));

  let { newContractAddress, createContractAmount } = sendFundsDetails;

  try {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );

    let uc_add = await factory.user_contract.call();
    const userContract = await UserContract.at(uc_add);

    let _value = 1e18 * createContractAmount;

    const response = userContract.Initiate(newContractAddress, _value, {
      from: account,
      gas: 4000000,
      value: _value * 2
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
