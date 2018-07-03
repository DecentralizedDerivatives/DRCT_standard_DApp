import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import { getUserTransactions } from '../actions/userActions';
import '../styles/MyTransactions.css';

class MyTransactions extends Component {
  handleRowClick = e => {
    e.preventDefault();

    let addressEl = e.target.getElementsByClassName('link__token-address')[0];
    if (typeof addressEl !== 'undefined') {
      this.openContractDetails(
        link,
        addressEl.getAttribute('data-token-address')
      );
    }
  };

  renderRows() {
    /**
     ******************************************
     */
    // Where is this from?
    const { tokenInfo } = this.state;

    this.props.userTransactions.map(trade => {
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
              onClick={this.handleRowClick}
              data-token-address={tradeHash}
            >
              {tradeHash.substring(0, 14)}...
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <Table className="transactions-table" onClick={this.onClickRow}>
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
    );
  }
}

MyTransactions.propTypes = {
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
