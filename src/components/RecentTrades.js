import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';

class RecentTrades extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      myAccount: '',
      selectedTokenAddress: '',
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: '',
      oracleAddress: '',
      recentTrades: ''
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });

    this.getRecentTrades().then(res => {
      this.setState({ recentTrades: res });
    });
  }

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  getRecentTrades = async () => {
    const exchange = await Exchange.deployed();
    var _trades = [];

    let transferEvent = await exchange.Sale(
      {},
      { fromBlock: 0, toBlock: 'latest' }
    );

    await transferEvent.get((error, logs) => {
      for (let i = logs.length - 1; i >= Math.max(logs.length - 10, 0); i--) {
        _trades.push({
          address: logs[i].args['_token'].toString(),
          volume: logs[i].args['_amount'].toString(),
          price: (logs[i].args['_price'] / 1e18).toString(),
          contractDuration: this.state.contractDuration,
          contractMultiplier: this.state.contractMultiplier,
          symbol: 'BTC/USD' /*CURRENTLY USING STATIC SYMBOL NEED TO FIX*/
        });
      }
      if (logs.length === 0) {
        _trades = [['No Recent Trades', '...', '...']];
      }
    });
    return _trades;
  };

  onClickRow = link => {
    let addressEl = link.currentTarget.getElementsByClassName(
      'token-address-link'
    )[0];
    if (typeof addressEl !== 'undefined') {
      // Same API for recent trades details?
      // this.openContractDetails(
      //   link,
      //   addressEl.getAttribute('data-token-address')
      // );
    }
  };

  renderRows() {
    this.state.recentTrades.map(trade => {
      const {
        address,
        volume,
        price,
        contractDuration,
        contractMultiplier,
        symbol
      } = trade;

      return (
        <tr>
          <td>
            <a
              className="token-address-link"
              onClick={event => event.stopPropagation()}
              data-token-address={address}
            >
              {symbol} - {contractDuration} Days - {contractMultiplier}X
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
      <div className="flex-item">
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

export default RecentTrades;
