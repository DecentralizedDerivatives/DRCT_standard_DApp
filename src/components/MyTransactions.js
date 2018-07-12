import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getUserTransactions } from '../actions/userActions';

// Use named export for unconnected component for testing
export class MyTransactions extends Component {
  renderRows = () => {
    if (this.props.userTransactions.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Events</h5></td></tr>
    }
    var rows = this.props.userTransactions.map(trade => {
      const tradeTitle = trade[0];
      const tradeHash = trade[1];

      return (
        <tr>
          <td>{tradeTitle}</td>
          <td>
            <a
              className="link__token-address"
              href={
                tradeHash.length > 50
                  ? `https://rinkeby.etherscan.io/tx/${tradeHash}`
                  : `https://rinkeby.etherscan.io/address/${tradeHash}`
              }
              target="_blank"
              onClick={this.props.onRowClick}
              data-token-address={tradeHash}
            >
              {tradeHash.substring(0, 14)}...
            </a>
          </td>
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
            id="transactions-table"
            className="table table-hover table-striped table-responsive"
          >
            <thead>
              <tr>
                <th>My Transactions</th>
              </tr>
              <tr>
                <th>Transaction</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

MyTransactions.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  userTransactions: PropTypes.array
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  userTransactions: state.user.userTransactions
});

export default connect(
  mapStateToProps,
  { getUserTransactions }
)(MyTransactions);
