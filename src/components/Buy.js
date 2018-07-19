import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
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

  async componentDidMount() {
    await this.props.getOrderDetails(this.props.orderId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.buyOrderError !== null) {
      this.setState({
        resultsMessage: `Error: ${this.props.buyOrderError}`,
        formOpen: false
      });
    } else if (this.props.buyOrderTx) {
      this.setState({
        resultsMessage: `Buy Order result ${this.props.buyOrderTx}`,
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
    this.state.formOpen?(
      <div>
        <div className="order-modal-background" onClick={this.closeOrderModal} />
        <div className="order-modal">
             <div id="buy-form">
             <h4 className="center-text">Buy Order</h4>
             <BuyFormContainer />
           </div>
        </div>
      </div>
    ):(
      null
    )
  );
  closeOrderModal = () => this.setState({formOpen:false});
  render() {
    return (
      // <div className="container">
      //   <div id="buy-button">
      //     <button className="btn btn-info" onClick={this.toggleFormVisibility}>
      //       Buy Order
      //     </button>
      //   </div>

      //   <Collapse isOpen={this.state.formOpen}>
      //     <div id="buy-form">
      //       <h4 className="center-text">Buy Order</h4>
      //       <BuyFormContainer />
      //     </div>
      //   </Collapse>

      //   {this.state.resultsMessage && (
      //     <div id="results-message" className="text-center">
      //       {this.state.resultsMessage}
      //     </div>
      //   )}
      // </div>
      <div className="order-btn-wrapper">
        <div className="order-btn"  onClick={this.toggleFormVisibility}>
          <label className="order-btn-label">
            Buy Order
          </label>
        </div>
        {this.renderOrderModal()}
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
  orderId: PropTypes.string.isRequired,
  userAccount: PropTypes.string.isRequired,
  buyOrderTx: PropTypes.string.isRequired,
  buyOrderError: PropTypes.string
};

const mapStateToProps = state => ({
  orderId: state.order.buy.orderId,
  userAccount: state.user.userAccount,
  buyOrderTx: state.order.buy.id,
  buyOrderError: state.order.buyOrderError
});

export default connect(
  mapStateToProps,
  { getOrderDetails }
)(Buy);
