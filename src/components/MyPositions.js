import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Loading from './Loading';
import { SET_USER_POSITIONS } from '../actions/types';

export class MyPositions extends Component {
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
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
        contractMultiplier,
        tokenType
      } = position;

      return (
        <tr key={index}>
          <td>
            {tokenType} {symbol} - {contractDuration} Days - {contractMultiplier}X
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
        <Table className="table table-hover table-striped table-responsive">
          <thead>
            <tr>
              <th colSpan='3'>My Tokens</th>
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
    );
  }
}

MyPositions.propTypes = {
  loading: PropTypes.bool.isRequired,
  userPositions: PropTypes.array
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_USER_POSITIONS),
  userPositions: state.user.userPositions
});

export default connect(mapStateToProps,{ })(MyPositions);
