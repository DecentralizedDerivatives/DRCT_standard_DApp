import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import CircularProgress from './CircularProgress';
import Dropdown from './Dropdown';
import { Factory, token, DRCT, web3, Exchange } from '../ethereum';
import '../styles/list.css';

class List extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      open: false,
      selectedToken: '',
      amount: '',
      price: '',
      loading: false,
      disabled: false,
      created: false,
      myTokens: [],
      showList: false,
      txId: '',
      approval: ''
    };
  }
  componentWillMount() {
    this.getMyPositions();
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  getMyPositions = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const accounts = await web3.eth.getAccounts();
    const numDates = await factory.getDateCount();
    let _allrows = [];
    let openDates = [];
    for (let i = 0; i < numDates; i++) {
      const startDates = (await factory.startDates.call(i)).c[0];
      const _token_addresses = await factory.getTokens(startDates);
      let _date = new Date(startDates * 1000);
      _date =
        _date.getMonth() +
        1 +
        '/' +
        _date.getDate() +
        '/' +
        _date.getFullYear();
      for (let j = 0; j < _token_addresses.length; j++) {
        const drct = await DRCT.at(_token_addresses[j]); //Getting contract
        const _balance = (await drct.balanceOf(accounts[0])).c[0]; //Getting balance of token
        if (_balance > 0) {
          _allrows.push(
            _token_addresses[j] + '(' + _balance + '/' + _date + ')'
          ); //Pushing token address + balance/date
        }
      }
    }
    console.log('mytokens', _allrows);
    _allrows.length
      ? this.setState({
          myTokens: _allrows,
          selectedToken: _allrows[0]
        })
      : this.setState({ myTokens: ['No Current Positions'] });
  };

  approveOrder = async () => {
    const accounts = await web3.eth.getAccounts();
    const exchange = await Exchange.deployed();
    const tokenSel = this.state.selectedToken
      .split('(')[0]
      .replace(/['"]+/g, '');
    const drct = await DRCT.at(tokenSel);
    let response, error;
    this.setState({ loading: true, disabled: true, showApproval: true });
    console.log('inputs', exchange.address, this.state.amount);
    try {
      response = await drct.approve(exchange.address, this.state.amount, {
        from: accounts[0],
        gas: 4000000
      });
      /*Handle Success Here*/
      this.setState({
        showList: true,
        txId: response.tx,
        approval: 'Order approval confirmed',
        loading: false
      });
    } catch (error) {
      /*Handle error here*/
      this.setState({
        txId: error.tx,
        error: true,
        disabled: false,
        loading: false,
        approval: 'Error approving order'
      });
    }
  };

  listOrder = async () => {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();
    const tokenSel = this.state.selectedToken
      .split('(')[0]
      .replace(/['"]+/g, '');
    let response, error;
    exchange
      .list(tokenSel, this.state.amount, this.state.price * 1e18, {
        from: accounts[0],
        gas: 4000000
      })
      .then((res, err) => {
        if (err) {
          console.log('Error Message:', err);
        } else {
          console.log('RESPONSE', res);
        }
      });
    this.props.toggle;
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="container list-form">
          <div className="dialog-container">
            <div className="input-container">
              <p className="input">Place Order</p>
              <div className="flex-container">
                <Dropdown
                  options={this.state.myTokens}
                  value={this.state.selectedToken || 'Select a Token'}
                  name="selectedToken"
                  onChange={this.handleChange}
                  className="dropdown-selectedToken"
                />
              </div>
            </div>

            <div className="input-container">
              <p className="input">Price (in Ether)</p>

              <TextField
                id="price"
                value={Number(this.state.price)}
                type="number"
                onChange={this.handleTextfieldChange('price')}
                className="full-width"
                helperText="Enter the price in Ether (e.g. 0.1)"
              />
            </div>

            <div className="input-container">
              <p className="input">Amount</p>

              <TextField
                id="amount"
                value={Number(this.state.amount)}
                type="number"
                onChange={this.handleTextfieldChange('amount')}
                className="full-width"
                helperText="Enter the amount of the token to sell"
              />
            </div>

            <button
              className={this.state.disabled ? 'button-disabled' : 'button'}
              disabled={this.state.disabled}
              onClick={this.approveOrder}
            >
              <span className="button-text">Submit for Approval</span>
            </button>
          </div>

          {this.state.showApproval && <div className={classes.line} />}
          {this.state.showApproval && (
            <div className="approval-container">
              <div className="input-container">
                <div className="flex-container-stretch">
                  <div>
                    <p className="input">Approval</p>
                  </div>

                  <div>
                    {this.state.loading && (
                      <div className="flex-container-stretch">
                        <div>
                          <p className="waiting">Waiting for confirmation...</p>
                        </div>

                        <div>
                          <CircularProgress />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {this.state.approval && (
                  <p className="approval input-text">{this.state.approval}</p>
                )}
              </div>
            </div>
          )}

          {this.state.showList && <div className="line" />}
          {this.state.showList && (
            <div className="list-container">
              <button className="button" onClick={this.listOrder}>
                <span className="button-text">List Order</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default List;
