import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import BlockProgress from './BlockProgress';
import Dropdown from './Dropdown';
import { Factory, UserContract, web3 } from '../ethereum';
import '../styles/createContract.css';

class CreateContract extends Component {
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
      contractAddress: '',
      txId: '',
      selectedDate: '',
      loading: false,
      disabled: false,
      created: false,
      openDates: []
    };
  }
  static durations = ['One week'];
  static currency = ['BTC/USD'];

  componentWillMount() {
    this.getOpenDates().then(res => {
      this.setState({
        openDates: res
      });
    });
  }

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
  getOpenDates = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const openDates = [];
    const numDates = await factory.getDateCount();
    for (let i = 0; i < numDates; i++) {
      const startDates = (await factory.startDates.call(i)).c[0];
      let _date = new Date(startDates * 1000);
      _date =
        _date.getUTCMonth() +
        1 +
        '/' +
        _date.getUTCDate() +
        '/' +
        _date.getUTCFullYear();
      openDates.push(_date);
    }
    return openDates;
  };

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  createContract = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const accounts = await web3.eth.getAccounts();

    let date = Math.floor(new Date(this.state.selectedDate).getTime() / 1000);
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

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */

  sendFunds = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    let uc_add = await factory.user_contract.call();
    const userContract = await UserContract.at(uc_add);
    const accounts = await web3.eth.getAccounts();
    console.log(this.state.contractAddress);
    console.log(accounts[0]);

    let _value = 1e18 * this.state.amount;
    console.log(this.state.contractAddress, _value, _value * 2);
    let response, error;
    userContract
      .Initiate(this.state.contractAddress, _value, {
        from: accounts[0],
        gas: 4000000,
        value: _value * 2
      })
      .then((res, err) => {
        if (err) {
          console.log('Error Message:', err);
        } else console.log('Succesful Initiation of Contract!: ', res);
      });
    this.props.toggle;
  };
  handleDropdownChange = e => {
    this.setState({ selectedDate: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="container" open={this.props.open}>
          <div className={classes.dialogContent}>
            <div className="input-container">
              <p className="input">Contract Type</p>
              <div className="flex-container">
                <div>
                  <Dropdown
                    options={CreateContract.durations}
                    value={this.state.duration}
                    name="duration"
                    onChange={this.handleChange}
                    className="dropdown-duration"
                  />
                </div>
                <div>
                  <Dropdown
                    options={CreateContract.currency}
                    value={this.state.currency}
                    name="currency"
                    onChange={this.handleChange}
                    className="dropdown-currency"
                  />
                </div>
              </div>
            </div>

            <div className="input-container">
              <p className="input">Start Date</p>
              <Dropdown
                menuItems={this.state.openDates}
                value={this.state.selectedDate}
                name="selectedDate"
                onChange={this.handleChange}
                className="dropdown-date"
              />
            </div>

            <div className="input-container">
              <p className="input">Amount of Ether</p>

              <TextField
                id="amount"
                value={Number(this.state.amount)}
                type="number"
                onChange={this.handleTextfieldChange('amount')}
                className="full-width"
                helperText="Must be at least 0.1"
              />
            </div>
            <button
              className={this.state.disabled ? 'button-disabled' : 'button'}
              disabled={this.state.disabled}
              onClick={this.createContract}
            >
              <span className="button-text">Create Contract</span>
            </button>
          </div>

          {this.state.showAddress && <div className={classes.line} />}
          {this.state.showAddress && (
            <div className="address-result-container">
              <div className="input-container">
                <div className="flex-container-stretch">
                  <div>
                    <p className="input">Address Result</p>
                  </div>

                  <div>
                    {this.state.loading && (
                      <div className="flex-container-stretch">
                        <div>
                          <p className="waiting">Waiting for confirmation...</p>
                        </div>

                        <div>
                          <BlockProgress />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {this.state.contractAddress && (
                  <p className="contract-address">
                    {this.state.contractAddress}
                  </p>
                )}
              </div>
            </div>
          )}

          {this.state.showSendFunds && <div className={classes.line} />}
          {this.state.showSendFunds && (
            <div className="send-funds-container">
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

export default CreateContract;
