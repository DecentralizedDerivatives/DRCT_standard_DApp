import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import CashOutFormContainer from './CashOutFormContainer';
import { getUserBalance } from '../actions/userActions';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.unlistOrderError !== 'null') {
      this.setState({
        resultsMessage: `Error: ${this.props.cashOutError}`,
        formOpen: false
      });
    } else if (this.props.unlistOrderTx) {
      this.setState({
        resultsMessage: `Tx receipt: ${this.props.cashOutTx}`,
        formOpen: false
      });
    }
  }

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
          <button className="btn btn-info" onClick={this.toggleFormVisibility}>
            Cash Out
          </button>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <div id="cashout-form">
            <h4 className="center-text">Cash Out Request</h4>
            <CashOutFormContainer />
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
  userBalance: PropTypes.number.isRequired,
  cashOutTx: PropTypes.string.isRequired,
  cashOutError: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userBalance: state.user.userBalance,
  cashOutTx: state.user.cashOutTx,
  cashOutError: state.user.cashOutError
});

export default connect(
  mapStateToProps,
  { getUserBalance }
)(CashOut);
