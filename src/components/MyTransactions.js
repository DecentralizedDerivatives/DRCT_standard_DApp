import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getUserTransactions } from '../actions/userActions';
import { SET_USER_TRANSACTIONS } from '../actions/types';
import FactoryProvider from '../factoryProvider';
// Use named export for unconnected component for testing
export class MyTransactions extends Component {
  renderRows = () => {
    if (this.props.loading) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><Loading /></td></tr>
    }
    if (this.props.userTransactions.length === 0) {
      return <tr><td colSpan='12' style={{textAlign: 'center'}}><h5>No Recent Events</h5></td></tr>
    }
    // console.log('Transactions', this.props.userTransactions)
    var rows = this.props.userTransactions.map((trade, index) => {
      const tradeTitle = trade.title;
      const tradeHash = trade.hash;
      const network_id = FactoryProvider.getNetworkId();
      const networks = require('../networkProvider');
      const url = networks[network_id].url
      return (
        <tr key={index}>
          <td>{tradeTitle}</td>
          <td>
            <a target="_blank" className="link__token-address"
              href={
                tradeHash.length > 50
                  ? `${url}/tx/${tradeHash}`
                  : `${url}/address/${tradeHash}`
              }>{tradeHash}
            </a>
          </td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div className="wide-table-container">
        <div className='table-title'>My Transactions</div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th style={{width: '30%'}}>Transaction</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

MyTransactions.propTypes = {
  loading: PropTypes.bool.isRequired,
  userTransactions: PropTypes.array
};

const mapStateToProps = state => ({
  loading: state.status.fetchInProgress.includes(SET_USER_TRANSACTIONS),
  userTransactions: state.user.userTransactions
});

export default connect(
  mapStateToProps,
  { getUserTransactions }
)(MyTransactions);
