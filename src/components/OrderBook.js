import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getOrderBook } from '../actions/contractActions';
import { sendBuyOrder,sendUnlistOrder } from '../actions/orderActions';
import { SET_ORDERBOOK } from '../actions/types';
import { formatter } from '../formatter'

export class OrderBook extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.buyOrderTx) {
      this.props.refreshPage(true)
    }
  }
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
  handleBuy (orderId, e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.sendBuyOrder(orderId, this.props.userAccount)
  }

  handleUnlist(orderId, e){
    e.preventDefault()
    e.stopPropagation()
    this.props.sendUnlistOrder(orderId,this.props.userAccount)
  }

  renderUnlist(orderId, creatorAddress){
    if (creatorAddress.toLowerCase() == this.props.userAccount.toLowerCase()){
      return (
        <td style={{padding: '0.4rem'}}>
          <button className='btn btn-thin' onClick={this.handleUnlist.bind(this,orderId)}>Unlist</button>
        </td>
        )
    }
  }
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
    if (this.props.orderbook.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Orders</h5></td></tr>
    }
    var rows = this.props.orderbook.map(order => {
      const { orderId, address, creatorAddress, price, quantity, date, symbol, tokenType, contractGain } = order;
      return (
        <tr key={orderId} className='clickable' onClick={this.props.onRowClick.bind(this, address, symbol, date)}>
          <td>{orderId}</td>
          <td>{tokenType + ' ' + symbol}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{date}</td>
          <td>{this.formatPercent(contractGain, ' -- ')}</td>
          <td style={{padding: '0.4rem'}}>
            <button className='btn btn-theme btn-thin' onClick={this.handleBuy.bind(this, orderId)}>Buy</button>
          </td>
          {this.renderUnlist(orderId,creatorAddress)}
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
              <th colSpan='6'>Order Book<div className='warning'>{this.props.buyOrderError}</div></th>
            </tr>
            <tr>
              <th style={{width: '15%'}}>Order Id</th>
              <th style={{width: '40%'}}>Asset</th>
              <th style={{width: '15%'}}>Price (ETH)</th>
              <th style={{width: '15%'}}>Quantity</th>
              <th>Start Date</th>
              <th>Gain/Loss</th>
              <th></th>
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
  contractMultiplier: PropTypes.number.isRequired,
  userAccount: PropTypes.string,
  buyOrderError: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_ORDERBOOK),
  orderbook: state.contract.orderbook,
  userAccount: state.user.userAccount,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier,
  buyOrderError: state.order.buyOrderError
});

export default connect(
  mapStateToProps,
  { getOrderBook, sendBuyOrder, sendUnlistOrder  }
)(OrderBook);
