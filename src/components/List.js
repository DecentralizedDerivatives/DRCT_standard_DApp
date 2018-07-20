import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Collapse } from 'reactstrap';
import ListFormContainer from './ListFormContainer';
import ApprovalFormContainer from './ApprovalFormContainer';
import { sendApproveOrder } from '../actions/orderActions';

export class List extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      resultsMessage: ''
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listOrderError !== null) {
      this.setState({
        resultsMessage: `Error: ${nextProps.listOrderError}`,
        formOpen: false
      });
    } else if (nextProps.listOrderId) {
      this.setState({
        resultsMessage: `List Order result ${nextProps.listOrderId}`,
        formOpen: true
      });
    } else if (nextProps.listOrderApproveError) {
      this.setState({
        resultsMessage: `Error: ${nextProps.listOrderApproveError}`,
        formOpen: true
      });
    } else if (nextProps.listOrderApproved) {
      this.setState({
        resultsMessage: `Order approval confirmed`,
        formOpen: true
      });
    }
  }

  // handleApproveClick = async e => {
  //   const approveDetails = {
  //     selectedToken: this.props.selectedToken,
  //     amount: this.props.tokenAmt
  //   };
  //
  //   await this.props.sendApproveOrder(approveDetails, this.props.userAccount);
  //
  //   console.log('APPROVAL SENT');
  //   if (this.props.listOrderApproveError) {
  //     this.setState({
  //       resultsMessage: `Error in Approve Click: ${this.props.listOrderApproveError}`,
  //       sendFundsOpen: false,
  //       formOpen: false
  //     });
  //   } else {
  //     this.setState({
  //       resultsMessage: `Order approval confirmed in Approve Click`,
  //       sendFundsOpen: false,
  //       formOpen: false
  //     });
  //   }
  // };

  toggleFormVisibility() {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }
  renderOrderModal = () => (
    this.state.formOpen || this.state.resultsMessage ? (
      <div>
        <div className="order-modal-background" onClick={this.closeOrderModal} />
        <div className="order-modal">
          <div id="buy-form">
            <h4 className="order-modal-head">
              { this.props.listOrderApproved ? <span>List Order</span> : <span>Approve Order</span> }</h4>
            { this.props.listOrderApproved ? <ListFormContainer /> : <ApprovalFormContainer /> }
            {this.state.resultsMessage && (
              <div id="results-message" className="text-center">
                {this.state.resultsMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    ) : (
        null
      )
  );
  closeOrderModal = () => this.setState({ formOpen: false, resultsMessage: "" });
  render() {
    return (
      // <div className="container">
      //   <div id="list-button">
      //     <button className="btn btn-info" onClick={this.toggleFormVisibility}>
      //       List Order
      //     </button>
      //   </div>

      //   <Collapse isOpen={this.state.formOpen}>
      //     <div id="list-form">
      //       <h4 className="center-text">Place Order</h4>
      //       <ListFormContainer />
      //     </div>
      //   </Collapse>

      //   <Collapse isOpen={this.state.approvalOpen}>
      //     <div id="approval">
      //       <h4 className="center-text">Order Placed</h4>
      //       <button
      //         className="btn btn-success"
      //         onClick={this.handleApproveClick}
      //       >
      //         Approve Order
      //       </button>
      //     </div>
      //   </Collapse>

      //   {this.state.resultsMessage && (
      //     <div id="results-message" className="text-center">
      //       {this.state.resultsMessage}
      //     </div>
      //   )}
      // </div>
      <div className="order-btn-wrapper">
        <div className="order-btn" onClick={this.toggleFormVisibility}>
          <label className="order-btn-label">
            List Order
            </label>
        </div>
        {this.renderOrderModal()}
      </div>
    );
  }
}
List.propTypes = {
  sendApproveOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  userTokens: PropTypes.array.isRequired,
  selectedToken: PropTypes.string,
  tokenAmt: PropTypes.number,
  tokenPrice: PropTypes.number,
  listOrderId: PropTypes.string,
  listOrderError: PropTypes.string,
  listOrderApproved: PropTypes.bool,
  listOrderApproveError: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  userTokens: state.user.userTokens,
  selectedToken: state.order.list.token,
  tokenAmt: state.order.list.amount,
  tokenPrice: state.order.list.price,
  listOrderId: state.order.list.id,
  listOrderError: state.order.listOrderError,
  listOrderApproved: state.order.list.approved,
  listOrderApproveError: state.order.listOrderFundsError
});

export default connect(
  mapStateToProps,
  { sendApproveOrder }
)(List);
