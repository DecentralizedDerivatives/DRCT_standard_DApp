import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import { getRecentTrades } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class RecentTrades extends Component {
  constructor(props) {
    super(props);

    const { handleRowClick } = this.props;
  }

  renderRows() {
    this.state.recentTrades.map(trade => {
      const { address, volume, price } = trade;

      const symbol = 'BTC/USD';

      return (
        <tr>
          <td>
            <a
              className="token-address-link"
              onClick={handleRowClick}
              data-token-address={address}
            >
              {symbol} - {this.props.contractDuration} Days -{' '}
              {this.porps.contractMultiplier}X
            </a>
          </td>
          <td>{volume}</td>
          <td>{price}</td>
        </tr>
      );
    });
  }

  render() {
    const { Body, Header, HeaderCell, Row } = Table;

    return (
      <div className="row">
        <Table className="recent-trades-table" onClick={this.onRowClick}>
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
    );
  }
}

RecentTrades.propTypes = {
  handleRowClick: PropTypes.func.isRequired,
  recentTrades: PropTypes.array.isRequired,
  contractDuration: PropTypes.string.isRequired,
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
