import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Loading from './Loading';
import { getRecentTrades } from '../actions/contractActions';
import { SET_RECENT_TRADES } from '../actions/types';

export class RecentTrades extends Component {
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
    var rows = this.props.recentTrades.map((trade, index) => {
      const { address, volume, orderDate, price, symbol, tokenType, contractDuration, contractMultiplier } = trade;
      return (
        <tr key={index} className='clickable' onClick={this.props.onRowClick.bind(this, address, symbol, orderDate)}>
          <td>{tokenType} {symbol} - {contractDuration} Days - {' ' + contractMultiplier}X</td>
          <td>{orderDate}</td>
          <td>{volume}</td>
          <td>{price}</td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="table-container recent-trades">
        <Table className="table table-hover table-striped table-responsive">
          <thead>
            <tr>
              <th colSpan='3'>Recent Trades</th>
            </tr>
            <tr>
              <th>Address</th>
              <th>Start Date</th>
              <th>Volume</th>
              <th>Price (ETH)</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </Table>
      </div>
    );
  }
}

RecentTrades.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  recentTrades: PropTypes.array.isRequired,
  contractDuration: PropTypes.number.isRequired,
  contractMultiplier: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_RECENT_TRADES),
  recentTrades: state.contract.recentTrades,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier
});

export default connect(
  mapStateToProps,
  { getRecentTrades }
)(RecentTrades);
