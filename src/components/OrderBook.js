import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getOrderBook } from '../actions/contractActions';
import { SET_ORDERBOOK } from '../actions/types';
import { formatter } from '../formatter'

export class OrderBook extends Component {
  formatMoney (val, empty) {
    if (!val) { return <span> {empty || '$0'} </span> }
    var cls = val < 0 ? 'warning' : ''
    return <span className={cls}>{formatter.toDollars(val)}</span>
  }
  formatPercent (val, empty) {
    if (!val) { return <span> {empty || '$0'} </span> }
    var cls = val < 0 ? 'warning' : ''
    return <span className={cls}>{formatter.toPercent(val)}</span>
  }
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
    if (this.props.orderbook.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Orders</h5></td></tr>
    }
    var rows = this.props.orderbook.map(order => {
      const { orderId, address, price, quantity, date, symbol, tokenType, contractGain } = order;
      return (
        <tr key={orderId} className='clickable' onClick={this.props.onRowClick.bind(this, address, symbol, date)}>
          <td>{orderId}</td>
          <td>{tokenType + ' ' + symbol}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{date}</td>
          <td>{this.formatPercent(contractGain, ' -- ')}</td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="table-container order-book">
        <table className="table table-hover table-striped table-responsive">
          <thead>
            <tr>
              <th colSpan='6'>Order Book</th>
            </tr>
            <tr>
              <th style={{width: '15%'}}>Order Id</th>
              <th style={{width: '40%'}}>Asset</th>
              <th style={{width: '15%'}}>Price (ETH)</th>
              <th style={{width: '15%'}}>Quantity</th>
              <th>Start Date</th>
              <th>Gain/Loss</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
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
