import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getContractDetails } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class MyPositions extends Component {
  renderRows = () => {
    if (this.props.userPositions.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Events</h5></td></tr>
    }
    var rows = this.props.userPositions.map((position, index) => {
      const {
        // address,
        balance,
        date,
        symbol,
        contractDuration,
        contractMultiplier
      } = position;

      return (
        <tr key={index}>
          <td>
            {symbol} - {contractDuration} Days - {contractMultiplier}X
          </td>
          <td>{balance}</td>
          <td>{date}</td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="table-container">
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
