import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import CashOutForm from './CashOutForm';
import { Wrapped, web3 } from '../ethereum';

class CashOut extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false
    };
  }

  async componentWillMount() {
    await this.props.getUserBalance();
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.sendCashOutRequest();
  };

  // Toggle form visibility on button click
  toggleFormVisibility() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div className="container">
        <div className="user-balance">
          Your Balance: {this.props.userBalance}
        </div>
        <div id="cashout-button">
          <button onClick={this.toggleFormVisibility}>Cash Out</button>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <div id="cashout-form">
            <h4 className="center-text">Cash Out Request</h4>
            <CashOutForm onSubmit={this.handleSubmit} />
          </div>
        </Collapse>
        {/* Todo - show "Processing" or "Transaction successful" */}
      </div>
    );
  }
}

CashOut.propTypes = {
  getUserBalance: PropTypes.func.isRequired,
  sendCashOutRequest: PropTypes.func.isRequired,
  userBalance: PropTypes.number.isRequired,
  withdrawAmount: PropTypes.number.isRequired,
  txProcessing: PropTypes.bool.isRequired,
  txReceipt: PropTypes.string
};

const mapStateToProps = state => ({
  userBalance: state.account.userBalance,
  withdrawAmount: state.form.cashout.withdrawAmount,
  txProcessing: state.status.txProcessing,
  txReceipt: state.status.txReceipt
});

export default connect(
  mapStateToProps,
  { getUserBalance, sendCashOutRequest }
)(CashOut);
