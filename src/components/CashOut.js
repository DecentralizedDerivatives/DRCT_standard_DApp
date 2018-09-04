import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CashOutFormContainer from './CashOutFormContainer';
import { getUserBalance } from '../actions/userActions';

// Use named export for unconnected component for testing
export class CashOut extends Component {
  constructor() {
    super();
    this.state = {
      resultsMessage: ''
    };
  }

  async componentWillMount() {
    await this.props.getUserBalance();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cashOutError) {
      this.setState({
        resultsMessage: `Error: ${nextProps.cashOutError}`,
      });
    } else if (nextProps.cashOutTx) {
      this.setState({ resultsMessage: '' });
      if (this.props.close) { this.props.close() }
    }
  }

  render() {
    return (
      <div className="create-contract">
        <div className="modal-background" onClick={this.props.close}></div>
        <div className="modal">
          <div id="cashout-form" className='cashout-form'>
            <h3 className="center-text">Cash Out Request</h3>
            <h4 className="user-balance">Your Balance: {this.props.userBalance} Ether</h4>
            <CashOutFormContainer alertUserBalance={this.alertUserBalance}/>
            {this.state.resultsMessage && (
              <div id="results-message" className="text-center">
                {this.state.resultsMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CashOut.propTypes = {
  close: PropTypes.func.isRequired,
  getUserBalance: PropTypes.func.isRequired,
  userBalance: PropTypes.number.isRequired,
  cashOutTx: PropTypes.string,
  cashOutError: PropTypes.string
};

const mapStateToProps = state => ({
  userBalance: state.user.userBalance,
  cashOutTx: state.user.cashOut.id,
  cashOutError: state.user.cashOutError
});

export default connect(
  mapStateToProps,
  { getUserBalance }
)(CashOut);
