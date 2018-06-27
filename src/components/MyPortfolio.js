import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyPositions from './MyPositions';
import MyTransactions from './MyTransactions';
import ContractDetails from './ContractDetails';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import '../styles/myPortfolio.css';

class MyPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      open: false,
      myAccount: '',
      selectedTokenAddress: '',
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: '',
      oracleAddress: ''
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });
  }

  openContractDetails = (newActive, token_address = false) => {
    if (token_address) {
      this.setState({
        active: newActive,
        open: true,
        previousActive: this.state.active,
        selectedTokenAddress: token_address
      });
    } else {
      this.setState({
        active: newActive,
        open: true,
        previousActive: this.state.active
      });
    }
  };

  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive
    });
  };

  render() {
    return (
      <div>
        <MyPositions />
        <MyTransactions />

        <ContractDetails
          open={this.state.open}
          toggle={this.closeContractDetails}
          tokenAddress={this.state.selectedTokenAddress}
        />
      </div>
    );
  }
}

export default MyPortfolio;
