import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getOrderBook } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class OrderBook extends Component {
  renderRows = () => {
    if (this.props.orderbook.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Orders</h5></td></tr>
    }
    var rows = this.props.orderbook.map(order => {
      const { orderId, address, price, quantity, date, symbol } = order;
      return (
        <tr key={orderId} className='clickable' onClick={this.props.onRowClick.bind(this, address, symbol)}>
          <td>{orderId}</td>
          <td>{symbol}</td>
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
      <div className="container">
        <div className="order-book">
          <Table
            id="positions-table"
            className="table table-hover table-striped table-responsive"
          >
            <thead>
              <tr>
                <th>Order Book</th>
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
      </div>
    );
  }
}

OrderBook.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  orderbook: PropTypes.array.isRequired,
  contractDuration: PropTypes.number.isRequired,
  contractMultiplier: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  orderbook: state.contract.orderbook,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier
});

export default connect(
  mapStateToProps,
  { getOrderBook }
)(OrderBook);
