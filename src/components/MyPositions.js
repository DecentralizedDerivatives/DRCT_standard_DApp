import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import '../styles/myPositions.css';

class MyPositions extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      myPositions: [['loading...', 'loading...', 'loading...']],
      myAccount: '',
      selectedTokenAddress: '',
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: '',
      oracleAddress: ''
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });

    this.getMyPositions().then(result => {
      this.setState({ myPositions: result });
    });
  }

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  getMyPositions = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    const _allrows = [];
    const openDates = [];
    const numDates = await factory.getDateCount();
    for (let i = 0; i < numDates; i++) {
      const startDates = (await factory.startDates.call(i)).c[0];
      const _token_addresses = await factory.getTokens(startDates);
      let _date = new Date(startDates * 1000);
      _date =
        _date.getUTCMonth() +
        1 +
        '/' +
        _date.getUTCDate() +
        '/' +
        _date.getUTCFullYear();
      openDates.push(_date);
      for (let j = 0; j < _token_addresses.length; j++) {
        let drct = await DRCT.at(_token_addresses[j]);
        let _balance = await drct.balanceOf(this.state.myAccount);
        if (_balance.c[0] > 0) {
          _allrows.push({
            address: _token_addresses[j],
            balance: _balance.c[0].toString(),
            date: _date.toString(),
            symbol: 'BTC/USD' /*CURRENTLY USING STATIC SYMBOL NEED TO FIX*/,
            contractDuration: this.state.contractDuration,
            contractMultiplier: this.state.contractMultiplier
          });
        }
      }
    }
    if (_allrows.length === 0)
      _allrows.push(['No Current Positions', '...', '...']);
    return _allrows;
  };

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
    this.state.myPositions.map(position => {
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
              className="token-address-link"
              onClick={event => event.stopPropagation()}
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
  }

  render() {
    return (
      <div className="flex-container-center">
        <div className="flex-item">
          <Table className="positions-table" onClick={this.onClickRow}>
            <thead>
              <tr>
                <th>My Positions</th>
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

export default MyPositions;
