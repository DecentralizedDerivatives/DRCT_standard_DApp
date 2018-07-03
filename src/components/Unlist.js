import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from './TextField';
import Dropdown from './Dropdown';
import { getUserOrders } from '../actions/accountActions';
import { sendUnlistOrder } from '../actions/orderActions';
import { Factory, Exchange, web3 } from '../ethereum';

// Use named export for unconnected component for testing
export class Unlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      resultsMessage: ''
    };

    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  async componentWillMount() {
    await this.props.getUserOrders(this.props.userAccount);
  }

  handleSubmit = async e => {
    e.preventDefault();

    await this.props.sendUnlistOrder(
      this.props.orderID,
      this.props.userAccount
    );

    if (this.props.unlistOrderError) {
      this.setState({
        resultsMessage: `Error: ${this.props.unlistOrderError}`,
        formOpen: false
      });
    } else {
      this.setState({
        resultsMessage: `Tx receipt: ${this.props.unlistOrderTx}`,
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
    const { selectedToken, orderLabels } = this.props;

    return (
      <div className="container">
        <div id="unlist-button">
          <button
            className="btn btn-primary"
            onClick={this.toggleFormVisibility}
          >
            Unlist Order
          </button>
        </div>

        <Collapse isOpen={this.state.formOpen}>
          <div id="unlist-form">
            <h4 className="center-text">Unlist Confirmation</h4>
            <UnlistForm
              name="unlistOrderID"
              onSubmit={this.handleSubmit}
              dropdownValue={selectedToken}
              dropdownData={orderLabels}
            />
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

Unlist.propTypes = {
  getUserOrders: PropTypes.func.isRequired,
  sendUnlistOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  orderID: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  orderLabels: PropTypes.array.isRequired,
  unlistOrderTx: PropTypes.string.isRequired,
  unlistOrderError: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.account.userAccount,
  orderID: state.form.unlist.unlistOrderID,
  selectedToken: state.current.selectedToken,
  orderLabels: state.account.userOrderLabels,
  unlistOrderTx: state.order.unlistOrderID,
  unlistOrderError: state.order.unlistOrderError
});

export default connect(
  mapStateToProps,
  { getUserOrders, sendUnlistOrder }
)(Unlist);
