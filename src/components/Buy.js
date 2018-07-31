import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BuyFormContainer from './BuyFormContainer';
import { getOrderDetails } from '../actions/orderActions';

// Use named export for unconnected component for testing
export class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      resultsMessage: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.buyOrderError !== null) {
      this.setState({
        resultsMessage: `Error: ${nextProps.buyOrderError}`,
        formOpen: false
      });
    } else if (nextProps.buyOrderTx) {
      this.setState({
        resultsMessage: `Success!  Order ID: ${nextProps.buyOrderTx}`,
        formOpen: false
      });
    }
  }

  toggleFormVisibility = () =>{
    this.setState({
      formOpen: !this.state.formOpen
    });
  }
  renderOrderModal = () => (
    this.state.formOpen||this.state.resultsMessage?(
      <div>
        <div className="order-modal-background" onClick={this.closeOrderModal} />
        <div className="order-modal">
             <div id="buy-form">
             <h4 className="order-modal-head">Order Confirmation</h4>
             <BuyFormContainer />
             {this.state.resultsMessage && (
              <div id="results-message" className="text-center">
                {this.state.resultsMessage}
              </div>
            )}
           </div>
        </div>
      </div>
    ):(
      null
    )
  );
  closeOrderModal = () => this.setState({formOpen:false,resultsMessage:""});
  render() {
    return (
      <div className="order-btn-wrapper">
        <div className="order-btn"  onClick={this.toggleFormVisibility}>
          <label className="order-btn-label">
            Buy Order
          </label>
        </div>
        {this.renderOrderModal()}
      </div>
    );
  }
}

Buy.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,
  orderId: PropTypes.number,
  buyOrderTx: PropTypes.string,
  buyOrderError: PropTypes.string
};

const mapStateToProps = state => ({
  orderId: state.order.buy.orderId,
  buyOrderTx: state.order.buy.id,
  buyOrderError: state.order.buyOrderError
});

export default connect(
  mapStateToProps,
  { getOrderDetails }
)(Buy);
