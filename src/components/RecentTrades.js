import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getRecentTrades } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class RecentTrades extends Component {
  renderRows = () => {
    var rows = this.props.recentTrades.map((trade, index) => {
      const { address, volume, price, symbol } = trade;
      return (
        <tr key={index}>
          <td>
            <a
              className="token-address-link"
              onClick={this.props.onRowClick}
              data-token-address={address}
            >
              {symbol} - {this.props.contractDuration} Days -{' '}
              {this.props.contractMultiplier}X
            </a>
          </td>
          <td>{volume}</td>
          <td>{price}</td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Table
            id="recent-trades-table"
            className="table table-hover table-striped table-responsive"
          >
            <thead>
              <tr>
                <th>Recent Trades</th>
              </tr>
              <tr>
                <th>Address</th>
                <th>Volume</th>
                <th>Price (ETH)</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

RecentTrades.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  recentTrades: PropTypes.array.isRequired,
  contractDuration: PropTypes.number.isRequired,
  contractMultiplier: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  recentTrades: state.contract.recentTrades,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier
});

export default connect(
  mapStateToProps,
  { getRecentTrades }
)(RecentTrades);
