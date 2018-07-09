import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getContractDetails } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class MyPositions extends Component {
  renderRows = () => {
    this.props.userPositions.map(position => {
      const {
        address,
        balance,
        date,
        symbol,
        contractDuration,
        contractMultiplier
      } = position;

      return (
        <tr>
          <td>
            <a
              className="link__token-address"
              onClick={this.props.onRowClick}
              data-token-address={address}
            >
              {symbol} - {contractDuration} Days - {contractMultiplier}X
            </a>
          </td>
          <td>{balance}</td>
          <td>{date}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Table
            id="positions-table"
            className="table table-hover table-striped table-responsive"
          >
            <thead>
              <tr>
                <th>My Tokens</th>
              </tr>
              <tr>
                <th>Asset</th>
                <th>Balance</th>
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

MyPositions.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  userPositions: PropTypes.array
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  userPositions: state.user.userPositions
});

export default connect(
  mapStateToProps,
  { getContractDetails }
)(MyPositions);
