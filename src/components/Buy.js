import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import BuyForm from './BuyForm';
import { getOrderDetails, sendBuyOrder } from '../actions/orderActions';
import { Factory, token, web3, Exchange } from '../ethereum';

// Use named export for unconnected component for testing
export class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      resultsMessage: ''
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  async componentDidMount() {
    await this.getOrderDetails(this.props.orderID);
  }

  handleSubmit = async e => {
    e.preventDefault();

    await this.sendBuyOrder(this.props.orderID, this.props.userAccount);

    if (this.props.buyOrderError) {
      this.setState({
        resultsMessage: `Error: ${this.props.buyOrderError}`,
        formOpen: false
      });
    } else {
      this.setState({
        resultsMessage: `Tx receipt: ${this.props.buyOrderTx}`,
        formOpen: false
      });
    }
  };

  toggleFormVisibility() {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }

  render() {
    return (
      <div className="container">
        <div id="buy-button">
          <button onClick={this.toggleFormVisibility}>Buy Order</button>
        </div>

        <Collapse isOpen={this.state.formOpen}>
          <div id="buy-form">
            <h4 className="center-text">Buy Order</h4>
            <BuyForm onSubmit={this.handleSubmit} />
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

Buy.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,
  sendBuyOrder: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  userAccount: PropTypes.string.isRequired,
  buyOrderTx: PropTypes.string.isRequired,
  buyOrderError: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  orderID: state.form.buy.orderID,
  userAccount: state.user.userAccount,
  buyOrderTx: state.order.buyOrderTx,
  buyOrderError: state.order.buyOrderError
});

export default connect(
  mapStateToProps,
  { getOrderDetails, sendBuyOrder }
)(Buy);
