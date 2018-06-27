import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';
import '../styles/myTransactions.css';

class MyTransactions extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      myAccount: '',
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: '',
      myTransactions: [['loading...', 'loading...']]
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });

    this.getMyTransactions();
  }

  getmyTransactions = async () => {
    const exchange = await Exchange.deployed();
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    let drct;
    let _trades = [];
    let titles = ['ContractCreation']; //Add other ATS when redeployed
    let ats = [
      {
        //Sale: await exchange.Sale({}, {fromBlock:0, toBlock: 'latest'}),
        //OrderPlaced: await exchange.OrderPlaced({}, {fromBlock:0, toBlock: 'latest'}),
        //OrderRemoved: await exchange.OrderRemoved({}, {fromBlock:0, toBlock: 'latest'}),
        ContractCreation: await factory.ContractCreation(
          {},
          { fromBlock: 0, toBlock: 'latest' }
        )
        //Transfer: await drct.Transfer({}, {fromBlock:0, toBlock: 'latest'}),
        //Approval: await drct.Approval({}, {fromBlock:0, toBlock: 'latest'})
      }
    ];

    for (let i = 0; i < titles.length; i++) {
      let transferEvent = await factory.ContractCreation(
        {},
        { fromBlock: 0, toBlock: 'latest' }
      );
      await transferEvent.get((error, logs) => {
        for (let j = logs.length - 1; j >= Math.max(logs.length - 10, 0); j--) {
          if (
            logs[i].args['_sender'].toUpperCase() ==
            this.state.myAccount.toUpperCase()
          ) {
            _trades.push([titles[i], logs[j].transactionHash]);
            this.setState({ myTransactions: _trades });
          }
        }
        if (_trades.length === 0) {
          _trades = [['No Recent Events', '...']];
        }
      });
    }
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
    const { tokenInfo } = this.state;

    this.state.myTransactions.map(trade => {
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

export default MyTransactions;
