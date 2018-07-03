import { web3 } from '../ethereum';
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

export const getOrderDetails = orderID => async dispatch => {
  dispatch(setProcessing(true));
  try {
    const exchange = await Exchange.deployed();
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const accounts = await web3.eth.getAccounts();

    // get orders for that book:
    let o_row = [];
    let _allrows = [];
    let order;
    order = await exchange.getOrder(orderID);

    let _date = await factory.token_dates.call(order[3]);
    _date = new Date(_date * 1000);
    _date =
      _date.getMonth() + 1 + '/' + _date.getDate() + '/' + _date.getFullYear();
    (o_row = orderID.toString() + '(' + order[3]),
      order[1].c[0].toString() +
        '/' +
        order[2].c[0].toString() +
        '/' +
        _date.toString() +
        ')';
    _allrows.push(o_row);

    dispatch({
      type: SET_ORDER_DETAILS,
      payload: _allrows
    });

    if (_allrows.length == 1) {
      dispatch({
        type: SET_SELECTED_TOKEN,
        payload: order[3]
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

export const sendBuyOrder = (orderID, account) => async dispatch => {
  dispatch(setProcessing(true));

  try {
    const exchange = await Exchange.deployed();
    const order = await exchange.getOrder(orderID);
    const _value = order[1];
    const response = await exchange.buy(order, {
      from: account,
      gas: 4000000,
      value: _value
    });

    dispatch({
      type: SET_BUY_ORDER_RECEIPT,
      payload: response.tx
    });
  } catch (err) {
    dispatch({
      type: SET_BUY_ORDER_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
  dispatch(setProcessing(false));
};

export const sendUnlistOrder = (orderID, account) => async dispatch => {
  dispatch(setProcessing(true));

  try {
    const exchange = await Exchange.deployed();
    const response = await exchange.unlist(orderID, {
      from: account,
      gas: 4000000
    });

    dispatch({
      type: SET_UNLIST_ORDER_RECEIPT,
      payload: response.tx
    });
  } catch (err) {
    dispatch({
      type: SET_UNLIST_ORDER_ERROR,
      payload: err.message.split('\n')[0]
    });
  }

  dispatch(setProcessing(false));
};

export const sendListOrder = (orderDetails, account) => async dispatch => {
  dispatch(setProcessing(true));

  let { selectedToken, amount, price } = orderDetails;

  try {
    const exchange = await Exchange.deployed();

    const response = await exchange.list(selectedToken, amount, price * 1e18, {
      from: account,
      gas: 4000000
    });

    dispatch({
      type: SET_LIST_ORDER,
      payload: response.tx
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
  selectedContractDate,
  account
) => async dispatch => {
  dispatch(setProcessing(true));

  try {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );

    let date = Math.floor(new Date(selectedContractDate).getTime() / 1000);
    date = date - (date % 86400);

    const response = await factory.deployContract(date, {
      from: account,
      gas: 4000000
    });

    dispatch({
      type: SET_CONTRACT_CREATED,
      payload: {
        newContractAddress: response.logs[0].args._created,
        newContractTx: response.tx
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
    // Need custom action - SET_CONTRACT_FUNDED
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
