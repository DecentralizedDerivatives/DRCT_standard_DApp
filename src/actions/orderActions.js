import { web3 } from '../ethereum';
import {
  SET_ORDER_DETAILS,
  SET_SELECTED_TOKEN,
  SET_PROCESSING_ERROR,
  TX_PROCESSING,
  RESET_TX_STATE
} from './types';

export const getOrderDetails = orderID => async dispatch => {
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
      type: SET_PROCESSING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};

export const sendBuyOrder = (orderID) => async dispatch => {
  dispatch(resetTxState());
  dispatch(setTxProcessing());

  try {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();

    let response, error, _value;
    let oId = this.state.orderID; //this.props.orderID
    let order = await exchange.getOrder(this.state.orderID);
    _value = order[1];
    console.log(oId, _value);
    try {
      response = await exchange.buy(oId, {
        from: accounts[0],
        gas: 4000000,
        value: _value
      });


    dispatch({
      type: SET_TX_RECEIPT,
      payload: response.tx
    });
  } catch (err) {
    dispatch({
      type: SET_PROCESSING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};

export const setTxProcessing = () => {
  return {
    type: TX_PROCESSING
  };
};

export const resetTxState = () => {
  return {
    type: RESET_TX_STATE
  };
};

