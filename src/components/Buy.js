import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import { Factory, token, web3, Exchange } from '../ethereum';
import '../styles/buy.css';

class Buy extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      open: false,
      selectedToken: '',
      loading: false,
      disabled: false,
      created: false,
      orderID: ''
    };
  }
  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  componentDidMount() {
    this.getOrderDetails();
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getOrderDetails = async () => {
    const exchange = await Exchange.deployed();
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const accounts = await web3.eth.getAccounts();

    // get orders for that book:
    let o_row = [];
    let _allrows = [];

    let order;
    let j = 4; //this.props.orderID
    order = await exchange.getOrder(j);
    let _date = await factory.token_dates.call(order[3]);
    _date = new Date(_date * 1000);
    _date =
      _date.getMonth() + 1 + '/' + _date.getDate() + '/' + _date.getFullYear();
    (o_row = j.toString() + '(' + order[3]),
      order[1].c[0].toString() +
        '/' +
        order[2].c[0].toString() +
        '/' +
        _date.toString() +
        ')';
    _allrows.push(o_row);
    this.setState({ myOrders: _allrows });
    if (_allrows.length == 1) {
      this.setState({ selectedToken: order[3] });
    }
  };

  buyOrder = async () => {
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
    } catch (err) {
      console.log(err);
      return err;
    }

    // TODO - show success or error message
    // On success, redirect to portfolio
    // {
    //   this.props.toggle;
    // }
  };

  render() {
    return (
      <div className="container buy-form">
        <div className="dialog-container">
          <div className="input-container">
            <p className="input">Order Confirmation</p>
          </div>
          <div className="input-container">
            <p className="input">Buy Order ID:</p>

            <TextField
              id="orderID"
              value={Number(this.state.orderID)}
              type="number"
              onChange={this.handleTextfieldChange('orderID')}
              className="full-width"
              helperText="Enter the orderID"
            />
          </div>

          <button
            type="button"
            className={this.state.disabled ? 'button-disabled' : 'button'}
            disabled={this.state.disabled}
            onClick={this.buyOrder}
          >
            <span className="button-text">Submit</span>
          </button>
        </div>
      </div>
    );
  }
}

Buy.propTypes = {
  orderID: PropTypes.string.isRequired
};

export default Buy;
