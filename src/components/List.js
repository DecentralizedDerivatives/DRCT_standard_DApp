import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import ListFormContainer from './ListFormContainer';
import { getUserTokenPositions } from '../actions/userActions';
import { sendApproveOrder } from '../actions/orderActions';

// Use named export for unconnected component for testing
export class List extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      approvalOpen: false,
      resultsMessage: ''
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  async componentDidMount() {
    await this.props.getUserTokenPositions(this.props.userAccount);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listOrderError !== null) {
      this.setState({
        resultsMessage: `Error: ${this.props.listOrderError}`,
        approvalOpen: false,
        formOpen: false
      });
    } else if (nextProps.listOrderId) {
      this.setState({
        resultsMessage: `List Order result ${this.props.listOrderId}`,
        approvalOpen: true,
        formOpen: false
      });
    } else if (this.props.listOrderApproveError) {
      this.setState({
        resultsMessage: `Error: ${this.props.listOrderApproveError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else if (this.props.listOrderApproved) {
      this.setState({
        resultsMessage: `Order approval confirmed`,
        sendFundsOpen: false,
        formOpen: false
      });
    }
  }

  handleApproveClick = async e => {
    const approveDetails = {
      selectedToken: this.props.selectedToken,
      amount: this.props.tokenAmt
    };

    await this.props.sendApproveOrder(approveDetails, this.props.userAccount);

    if (this.props.listOrderApproveError) {
      this.setState({
        resultsMessage: `Error: ${this.props.listOrderApproveError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else {
      this.setState({
        resultsMessage: `Order approval confirmed`,
        sendFundsOpen: false,
        formOpen: false
      });
    }
  };

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
            <h4 className="order-modal-head">Order Confirmation</h4>
            <ListFormContainer />
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
  getUserTokenPositions: PropTypes.func.isRequired,
  sendApproveOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  userTokens: PropTypes.array.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokenAmt: PropTypes.number,
  tokenPrice: PropTypes.number,
  listOrderId: PropTypes.string.isRequired,
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
  { sendApproveOrder, getUserTokenPositions }
)(List);
