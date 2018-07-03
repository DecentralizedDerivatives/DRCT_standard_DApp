import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyPositions from './MyPositions';
import MyTransactions from './MyTransactions';
import ContractDetails from './ContractDetails';
import { Factory, Exchange, web3, DRCT } from '../ethereum';

class MyPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      open: false,
      selectedTokenAddress: ''
    };
  }

  async componentDidMount() {
    await this.props.getUserAccount();
    await this.props.getUserPositions(this.props.userAccount);
    await this.props.getUserTransactions(this.props.userAccount);
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

MyPortfolio.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  getUserPositions: PropTypes.func.isRequired,
  getUserTransactions: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  userAccount: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

export default connect(
  mapStateToProps,
  { getUserAccount, getUserPositions, getUserTransactions }
)(MyPortfolio);
