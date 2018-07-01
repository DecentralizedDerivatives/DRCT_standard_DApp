import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import '../styles/myTransactions.css';

class MyTransactions extends Component {
  constructor() {
    super();
    this.state = {
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: ''
    };
  }

  async componentDidMount() {
    await this.props.getUserAccount();

    await this.getMyTransactions();
  }

  getmyTransactions = myAccount => {
    this.props.getUserTransactions(myAccount);
  };

  // Shouldn't this call a function to open TransactionDetails?
  onClickRow = link => {
    let addressEl = link.currentTarget.getElementsByClassName(
      'token-address-link'
    )[0];
    if (typeof addressEl !== 'undefined') {
      this.openContractDetails(
        link,
        addressEl.getAttribute('data-token-address')
      );
    }
  };

  renderRows() {
    const { tokenInfo } = this.state;

    this.props.myTransactions.map(trade => {
      const tradeTitle = trade[0];
      const tradeHash = trade[1];

      return (
        <tr>
          <td>{tradeTitle}</td>
          <td>
            <a
              className="token-address-link"
              href={
                tradeHash.length > 50
                  ? `https://rinkeby.etherscan.io/tx/${tradeHash}`
                  : `https://rinkeby.etherscan.io/address/${tradeHash}`
              }
              target="_blank"
              onClick={event => event.stopPropagation()}
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
      <div className="flex-item">
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
  getUserAccount: PropTypes.func.isRequired,
  getUserTransactions: PropTypes.func.isRequired,
  myAccount: PropTypes.string.isRequired,
  myTransactions: PropTypes.array
};

const mapStateToProps = state => ({
  myAccount: state.userAccount,
  myTransactions: state.userTransactions
});

export default connect(
  mapStateToProps,
  { getUserAccount, getUserTransactions }
)(MyTransactions);
