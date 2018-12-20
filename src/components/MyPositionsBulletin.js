import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { SET_USER_POSITIONS } from '../actions/types';
import { formatter } from '../formatter'
import List from './List'

export class MyPositionsBulletin extends Component {
  constructor() {
    super();

    this.state = {
      cashoutOpen: false,
      detailsOpen: false,
      formOpen: false,
      positionInfo: null,
    };
  }
  formatPercent (val, empty) {
    if (!val) { return <span> {empty || '$0'} </span> }
    var cls = val < 0 ? 'warning' : 'success'
    return <span className={cls}>{formatter.toPercent(val)}</span>
  }
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
    if (this.props.userPositions.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Events</h5></td></tr>
    }
    var rows = this.props.userPositions.map((position, index) => {
      const {
        address,
        balance,
        date,
        symbol,
        contractDuration,
        contractMultiplier,
        tokenType,
      } = position;

      return (
        <tr key={index}>
          <td>
            {tokenType} {symbol} - {contractDuration} Days - {contractMultiplier}X
          </td>
          <td>{balance}</td>
          <td>{date}</td>
          <td>
            <List positionInfo={position} refreshPage={this.props.refreshPage}/>
          </td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="wide-table-container">
        <div className='table-title'>My Tokens</div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th style={{width: '30%'}}>Asset</th>
              <th style={{width: '20%'}}>Balance</th>
              <th>Start Date</th>
              <th>List</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

MyPositionsBulletin.propTypes = {
  handleList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userPositions: PropTypes.array
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_USER_POSITIONS),
  userPositions: state.user.userPositions
});

export default connect(mapStateToProps,{ })(MyPositionsBulletin);
