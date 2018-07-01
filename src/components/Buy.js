import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import BuyForm from './BuyForm';
import { Factory, token, web3, Exchange } from '../ethereum';

class Buy extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  async componentDidMount() {
    await this.getOrderDetails(this.props.orderID);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.sendBuyOrder(this.props.orderID);
  };

  toggleFormVisibility() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div className="container">
        <div id="buy-button">
          <button onClick={this.toggleFormVisibility}>Buy Order</button>
        </div>

        <Collapse isOpen={this.state.collapse}>
          <div id="buy-form">
            <h4 className="center-text"> Buy Order</h4>
            <BuyForm
              onSubmit={this.props.handleSubmit}
              value={Number(this.props.orderId)}
              onChange={this.handleChange}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

Buy.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,
  sendBuyOrder: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  orderID: state.form.buy.orderID
});

export default connect(
  mapStateToProps,
  { getOrderDetails, sendBuyOrder }
)(Buy);
