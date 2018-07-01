import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Factory, Exchange, web3, DRCT } from '../ethereum';

class OrderBook extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      orderbook: [
        ['loading...', 'loading...', 'loading...', 'loading...', '...']
      ],
      myAccount: '',
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: ''
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });

    this.getOrderBook().then(result => {
      this.setState({ orderbook: result });
    });
  }

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  getOrderBook = async () => {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    //orderbook

    // first get number of open books (tokens with open orders):
    let exchange = await Exchange.deployed();
    let numBooks = await exchange.getBookCount();

    // get orders for that book:
    let allrows = [];
    let order;
    for (let i = 0; i < numBooks; i++) {
      let book = await exchange.openBooks(i);
      let orders = await exchange.getOrders(book);
      for (let j = 0; j < orders.length; j++) {
        if (orders[j].c[0] > 0) {
          order = await exchange.getOrder(orders[j].c[0]);
          let _date = await factory.token_dates.call(book);
          _date = new Date(_date * 1000);
          _date =
            _date.getUTCMonth() +
            1 +
            '/' +
            _date.getUTCDate() +
            '/' +
            _date.getUTCFullYear();
          allrows.push({
            orderId: orders[j].c[0].toString(),
            address: order[3],
            price: (order[1].c[0] / 10000).toString(),
            quantity: order[2].c[0].toString(),
            date: _date.toString(),
            contractDuration: this.state.contractDuration,
            contractMultiplier: this.state.contractMultiplier,
            symbol: 'BTC/USD' /*CURRENTLY USING STATIC SYMBOL NEED TO FIX*/
          });
        }
      }
    }
    return allrows;
  };

  renderRows() {
    this.state.orderbook.map(order => {
      const {
        orderId,
        address,
        price,
        quantity,
        date,
        contractDuration,
        contractMultiplier,
        symbol
      } = order;

      return (
        <tr>
          <td>{orderId}</td>
          <td>
            <a
              className="link__token-address"
              onClick={e => e.stopPropagation()}
              data-token-address={address}
            >
              <span>
                {symbol} - {contractDuration} Days - {contractMultiplier}X
              </span>
            </a>
          </td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  render() {
    const { Body, Header, HeaderCell, Row } = Table;

    return (
      <div className="container">
        <div className="order-book">
          <Table className="positions-table" onClick={this.onClickRow}>
            <thead>
              <tr>
                <th>Order Book</th>
              </tr>
              <tr>
                <th>Order Id</th>
                <th>Asset</th>
                <th>Price (ETH)</th>
                <th>Quantity</th>
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

export default OrderBook;
