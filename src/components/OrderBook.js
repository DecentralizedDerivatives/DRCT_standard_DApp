import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Loading from './Loading';
import { getOrderBook } from '../actions/contractActions';
import { SET_ORDERBOOK } from '../actions/types';
// Use named export for unconnected component for testing
export class OrderBook extends Component {
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
    if (this.props.orderbook.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Orders</h5></td></tr>
    }
    var rows = this.props.orderbook.map(order => {
      const { orderId, address, price, quantity, date, symbol, tokenType } = order;
      return (
        <tr key={orderId} className='clickable' onClick={this.props.onRowClick.bind(this, address, symbol, date)}>
          <td>{orderId}</td>
          <td>{tokenType + ' ' + symbol}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{date}</td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="table-container order-book">
        <Table className="table table-hover table-striped table-responsive">
          <thead>
            <tr>
              <th colSpan='6'>Order Book</th>
            </tr>
            <tr>
              <th>Order Id</th>
              <th>Asset</th>
              <th>Price (ETH)</th>
              <th>Quantity</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </Table>
      </div>
    );
  }
}

OrderBook.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  orderbook: PropTypes.array.isRequired,
  contractDuration: PropTypes.number.isRequired,
  contractMultiplier: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_ORDERBOOK),
  orderbook: state.contract.orderbook,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier
});

export default connect(
  mapStateToProps,
  { getOrderBook }
)(OrderBook);
