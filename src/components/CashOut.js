import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import CashOutForm from './CashOutForm';
import { getUserBalance, sendCashOutRequest } from '../actions/userActions';
import { Wrapped, web3 } from '../ethereum';

// Use named export for unconnected component for testing
export class CashOut extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      resultsMessage: ''
    };
  }

  async componentWillMount() {
    await this.props.getUserBalance();
  }

  handleSubmit = async e => {
    e.preventDefault();

    await this.props.sendCashOutRequest();

    if (this.props.cashOutError) {
      this.setState({
        resultsMessage: `Error: ${this.props.cashOutError}`,
        formOpen: false
      });
    } else {
      this.setState({
        resultsMessage: `Tx receipt: ${this.props.cashOutTx}`,
        formOpen: false
      });
    }
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

        {this.state.resultsMessage && (
          <div id="results-message" className="text-center">
            {this.state.resultsMessage}
          </div>
        )}
      </div>
    );
  }
}

CashOut.propTypes = {
  getUserBalance: PropTypes.func.isRequired,
  sendCashOutRequest: PropTypes.func.isRequired,
  userBalance: PropTypes.number.isRequired,
  withdrawAmount: PropTypes.number.isRequired,
  cashOutTx: PropTypes.string.isRequired,
  cashOutError: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userBalance: state.user.userBalance,
  withdrawAmount: state.form.cashout.withdrawAmount,
  cashOutTx: state.user.cashOutTx,
  cashOutError: state.user.cashOutError
});

export default connect(
  mapStateToProps,
  { getUserBalance, sendCashOutRequest }
)(CashOut);
