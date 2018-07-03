import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from './TextField';
import BlockProgress from './BlockProgress';
import Dropdown from './Dropdown';
import { Factory, token, DRCT, web3, Exchange } from '../ethereum';
import { getUserTokenPositions } from '../actions/userActions';

// Use named export for unconnected component for testing
export class List extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      approvalOpen: false
    };
  }
  async componentWillMount() {
    await this.props.getUserTokenPositions(this.props.userAccount);
  }

  handleListClick = async e => {
    const orderDetails = {
      selectedToken: this.props.selectedToken,
      amount: this.props.tokenAmt,
      price: this.props.tokenPrice
    };

    await this.props.sendListOrder(orderDetails, this.props.userAccount);

    // Check list order tx results
    // On error, show error in results-message div
    // On success, trigger approval process
    // Show approval button
    this.setState({
      approvalOpen: true,
      formOpen: false
    });
  };

  handleApproveClick = async e => {
    const approveDetails = {
      selectedToken: this.props.selectedToken,
      amount: this.props.tokenAmt
    };

    await this.props.sendApproveOrder(approveDetails, this.props.userAccount);

    // check results, display success or error
    // on success
  };

  toggleFormVisibility() {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }

  render() {
    return (
      <div className="container">
        <div id="list-button">
          <button onClick={this.toggleFormVisibility}>List Order</button>
        </div>

        <Collapse isOpen={this.state.formOpen}>
          <div id="list-form">
            <h4 className="center-text">Place Order</h4>
            <ListForm
              name="listOrderID"
              onSubmit={this.handleListClick}
              dropdownData={this.props.userTokens}
            />
          </div>
        </Collapse>

        <Collapse isOpen={this.state.approvalOpen}>
          <div id="approval">
            <h4 className="center-text">Order Placed</h4>
            <button onClick={this.handleApproveClick}>Approve Order</button>
          </div>
        </Collapse>

        <div id="results-message" className="hidden">
          {this.props.resultsMessage}
        </div>
      </div>
    );
  }
}
List.propTypes = {
  getUserTokenPositions: PropTypes.func.isRequired,
  sendListOrder: PropTypes.func.isRequired,
  sendApproveOrder: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  userAccount: PropTypes.string.isRequired,
  userTokens: PropTypes.array.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokenAmt: PropTypes.number.isRequired,
  tokenPrice: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  userTokens: state.user.userTokens,
  selectedToken: state.form.list.listOrderToken,
  tokenAmt: state.form.list.listTokenAmt,
  tokenPrice: state.form.list.listOrderPrice
});

export default connect(
  mapStateToProps,
  { getUserTokenPositions, sendListOrder, sendApproveOrder }
)(List);
