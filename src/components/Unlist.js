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
      collapse: false
    };
  }

  async componentWillMount() {
    await this.props.getUserOrders(this.props.userAccount);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.sendUnlistOrder(this.props.orderID, this.props.userAccount);
  };

  toggleFormVisibility() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const { selectedToken, orderLabels } = this.props;

    return (
      <div className="container">
        <div id="buy-button">
          <button onClick={this.toggleFormVisibility}>Unlist Order</button>
        </div>

        <Collapse isOpen={this.state.collapse}>
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
  orderLabels: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.account.userAccount,
  orderID: state.form.unlist.unlistOrderID,
  selectedToken: state.current.selectedToken,
  orderLabels: state.account.userOrderLabels
});

export default connect(
  mapStateToProps,
  { getUserOrders, sendUnlistOrder }
)(Unlist);
