import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import '../styles/contractDetails.css';

class ContractDetails extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      open: false,
      currency: '',
      amount: 0.1,
      selectedDate: new Date()
    };
  }

  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  componentDidMount() {
    this.getContractDetails();
  }

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  getContractDetails = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    let response, error;

    try {
      response = await factory.getVariables();
    } catch (err) {
      error = err;
    }
    if (error) {
      console.error('Error getting contract details', error);
      return;
    }

    this.setState({
      contractAddress: response[0],
      contractDuration: response[1].c[0],
      contractMultiplier: response[2].c[0],
      oracleAddress: response[3]
    });
  };

  render() {
    return typeof this.props.tokenAddress !== 'undefined' &&
      this.props.tokenAddress.length ? (
      <div className="container">
        <div className="input-container">
          <p className="input">Factory Contract</p>
        </div>
        <div className="input-container">
          <p className="input">
            Address:{' '}
            <a
              href={`https://rinkeby.etherscan.io/address/${
                this.props.contractAddress
              }`}
              target="_blank"
            >
              {this.props.contractAddress}
            </a>
          </p>
        </div>
        <div className="input-container">
          <p className="input">Duration: {this.props.contractDuration}</p>
        </div>
        <div className="input-container">
          <p className="input">Multiplier: {this.props.contractMultiplier}</p>
        </div>
        <div className="input-container">
          <p className="input">
            Oracle Address:{' '}
            <a
              href={`https://rinkeby.etherscan.io/address/${
                this.props.oracleAddress
              }`}
              target="_blank"
            >
              {this.props.oracleAddress}
            </a>
          </p>
        </div>
        <div className="input-container">
          <p className="input">
            Token Address:{' '}
            <a
              href={`https://rinkeby.etherscan.io/address/${
                this.props.tokenAddress
              }`}
              target="_blank"
            >
              {this.props.tokenAddress}
            </a>
          </p>
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="input-container">
          <p className="input">Factory Contract</p>
        </div>
        <div className="input-container">
          <p className="input">
            Address:{' '}
            <a
              href={`https://rinkeby.etherscan.io/address/${
                this.props.contractAddress
              }`}
              target="_blank"
            >
              {this.props.contractAddress}
            </a>
          </p>
        </div>
        <div className="input-container">
          <p className="input">Duration: {this.props.contractDuration}</p>
        </div>
        <div className="input-container">
          <p className="input">Multiplier: {this.props.contractMultiplier}</p>
        </div>
        <div className="input-container">
          <p className="input">
            Oracle Address:{' '}
            <a
              href={`https://rinkeby.etherscan.io/address/${
                this.props.oracleAddress
              }`}
              target="_blank"
            >
              {this.props.oracleAddress}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default ContractDetails;
