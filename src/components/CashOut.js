import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import CashOutFormContainer from './CashOutFormContainer';
import { getUserBalance } from '../actions/userActions';

// Use named export for unconnected component for testing
export class CashOut extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false,
      resultsMessage: ''
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  async componentWillMount() {
    await this.props.getUserBalance();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cashOutError !== 'null') {
      this.setState({
        resultsMessage: `Error: ${nextProps.cashOutError}`,
        collapse: false
      });
    } else if (nextProps.cashOutTx) {
      this.setState({
        resultsMessage: `Tx receipt: ${nextProps.cashOutTx}`,
        collapse: false
      });
    }
  }

  // Toggle form visibility on button click
  toggleFormVisibility() {
    this.setState({
      resultsMessage: '',
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div className="container">
        <h3 className="user-balance">Your Balance: {this.props.userBalance}</h3>
        <div id="cashout-button">
          <button
            className="btn create-contract-btn"
            onClick={this.toggleFormVisibility}
          >
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
  cashOutTx: PropTypes.string,
  cashOutError: PropTypes.string
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
