import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import CircularProgress from './CircularProgress';
import { Factory, token, web3 } from '../ethereum';
import '../styles/transactionDetails.css';

class TransactionDetails extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      open: false,
      duration: '',
      currency: '',
      amount: 0.1,
      selectedDate: new Date(),
      loading: false,
      disabled: false,
      created: false
    };
  }
  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  CashOut = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const accounts = await web3.eth.getAccounts();

    let date = Number(
      (new Date(this.state.selectedDate).getTime() / 1000).toFixed(0)
    );

    date = date - (date % 86400);

    let response, error;

    this.setState({ loading: true, disabled: true, showAddress: true });

    try {
      response = await factory.deployContract(date, {
        from: accounts[0],
        gas: 4000000
      });
    } catch (err) {
      error = err;
    }

    this.setState({ loading: false });

    if (error) {
      // Add error handling
      this.setState({ txId: error.tx, error: true, disabled: false });
      return;
    }

    this.setState({
      showSendFunds: true,
      txId: response.tx,
      contractAddress: response.logs[0].args._created
    });
  };

  render() {
    return (
      <div>
        <div className="container transaction-details-form">
          <div className="dialog-container">
            <div className="input-container">
              <p className="input-container">Transaction Details</p>
            </div>

            <div className="input-container">
              <p className="input-container">Amount of Ether</p>

              <TextField
                id="amount"
                value={Number(this.state.amount)}
                type="number"
                onChange={this.handleTextfieldChange('amount')}
                className="full-width"
                helperText="Must be at least 0.1"
              />
            </div>

            <div className="input-container">
              <p className="input-container">Premium</p>

              <TextField
                id="premium"
                value={this.state.premium}
                type="number"
                onChange={this.handleTextfieldChange('premium')}
                className="full-width"
                helperText="Recommended 0.1"
              />
            </div>

            <button
              className={this.state.disabled ? 'button-disabled' : 'button'}
              disabled={this.state.disabled}
              onClick={this.CashOut}
            >
              <span className="button-text">Create Contract</span>
            </button>
          </div>

          {this.state.showAddress && <div className="line" />}
          {this.state.showAddress && (
            <div className="address-result-container">
              <div className="input-container">
                <div className="flex-container-stretch">
                  <div className="flex-item">
                    <p className="input-container">Address Result</p>
                  </div>
                  <div className="flex-item">
                    {this.state.loading && (
                      <div className="flex-container-stretch">
                        <div className="flex-item">
                          <p className="waiting">Waiting for confirmation...</p>
                        </div>

                        <div className="flex-item">
                          <CircularProgress />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {this.state.txId && <p className="tx-id">{this.state.txId}</p>}
              </div>
            </div>
          )}

          {this.state.showSendFunds && <div className={classes.line} />}
          {this.state.showSendFunds && (
            <div className={classes.sendFundsContainer}>
              <button className="button" onClick={this.sendFunds}>
                <span className="button-text">Send Funds</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TransactionDetails;
