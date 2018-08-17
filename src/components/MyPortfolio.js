import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPositions from './MyPositions';
import MyTransactions from './MyTransactions';
// import ContractDetails from './ContractDetails';
import CreateContract from './CreateContract';
import CashOut from './CashOut';
import {
  getUserAccount,
  getUserPositions,
  getUserTransactions
} from '../actions/userActions';
import requireConnection from './requireConnection';

// Use named export for unconnected component for testing
export class MyPortfolio extends Component {
  constructor() {
    super();

    this.state = {
      cashoutOpen: false,
      detailsOpen: false,
      formOpen: false
    };
  }

  async componentDidMount() {
    await this.props.getUserAccount();
    if (!this.props.userAccount) { return };
    this.props.getUserPositions(this.props.userAccount);
    this.props.getUserTransactions(this.props.userAccount);
    this.positionsInterval = setInterval(() => this.props.getUserPositions(this.props.userAccount, true), 30000);
    this.transactionsInterval = setInterval(() => this.props.getUserTransactions(this.props.userAccount, true), 30000);
  }
  componentWillUnmount() {
    clearInterval(this.positionsInterval);
    clearInterval(this.transactionsInterval);
  }
  handleRowClick = async (transactionAddress, e) => {
    e.preventDefault();
    // console.log('ROW CLICK', transactionAddress);
    // TODO: Do we need a Transaction Details popup?
    // this.openContractDetails(symbol);
  };
  //
  openContractDetails = async symbol => {
    // await this.props.getContractDetails(symbol);
    this.setState({
      detailsOpen: true
    });
  };

  closeContractDetails = () => {
    this.setState({
      detailsOpen: false
    });
  };
  handleCreateContract = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  };
  renderCreateContract = () => {
    return this.state.formOpen ? (
      <CreateContract close={this.closeCreateContract} />
    ) : null;
  };
  closeCreateContract = () => {
    this.setState({
      formOpen: false
    });
  };
  handleCashout = () => {
    this.setState({
      cashoutOpen: !this.state.cashoutOpen
    });
  };
  renderCashout = () => {
    return this.state.cashoutOpen ? (
      <CashOut close={this.closeCashout} />
    ) : null;
  };
  closeCashout = () => {
    this.setState({
      cashoutOpen: false
    });
  };
  render() {
    return (
      <div id="portfolio">
        <MyPositions />
        <MyTransactions />
        {this.renderCreateContract()}
        <div
          className="create-contract-btn"
          onClick={this.handleCreateContract}
        >
          Create Contract
        </div>
        {this.renderCashout()}
        <div id="cashout-button">
          <button className="btn create-contract-btn"
            onClick={this.handleCashout}>
            Cash Out
          </button>
        </div>
      </div>
    );
  }
}

MyPortfolio.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  getUserPositions: PropTypes.func.isRequired,
  getUserTransactions: PropTypes.func.isRequired,
  orderId: PropTypes.string,
  userAccount: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

export default connect(
  mapStateToProps,
  { getUserAccount, getUserPositions, getUserTransactions }
)(requireConnection(MyPortfolio));
