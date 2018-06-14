import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Table from '../Table';
import ContractDetails from '../ContractDetails';
import PriceChart from '../PriceChart';
import List from '../List';
import Unlist from '../Unlist';
import Buy from '../Buy';

import './style.css'

import { Factory, Exchange, web3 } from '../../ethereum';

class Bulletin extends Component {
  constructor() {
    super();
    this.state = {
      orderbook: [['loading...', 'loading...', 'loading...', 'loading...', '...']],
      previousActive: '',
      recentTrades: [['loading...', 'loading...', 'loading...']],
      active: '',
      open: false,
      openU: false,
      openL: false,
      openB: false,
      orderID: "xxx",
      myAccount: "xxx",
      contractAddress: "",
      contractDuration: "",
      contractMultiplier: "",
      oracleAddress: "",
    };
  }
  fetchData = () => { };
  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });
    this.getOrderBook().then(result => {
      this.setState({ orderbook: result });
    });
    this.getRecentTrades().then(res => {
      this.setState({ recentTrades: res });
    });
    //Getting contract details one time when its parent gets mounted
    this.getContractDetails();
  }

  //This is the base data structure for an order (the maker of the order and the price)
  // struct Order {
  //     address maker;// the placer of the order
  //     uint price;// The price in wei
  //     uint amount;
  //     address asset;
  // }

  onClickRow = link => {
    this.openContractDetails();
    this.setState({ active: link });
  };

  onBuyClick = link => {
    console.log(link);
  }

  openContractDetails = () => {
    this.setState({
      open: true,
      previousActive: this.state.active,
    });
  };
  getContractDetails = async () => {
    const factory = await Factory.at("0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642");
    let response, error;
    try {
      response = await factory.getVariables();
    } catch (err) {
      error = err;
    }
    if (error) {
      console.log(error);
      return;
    }
    this.setState({
      contractAddress: response[0],
      contractDuration: response[1].c[0],
      contractMultiplier: response[2].c[0],
      oracleAddress: response[3],
    });
  };
  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  openBuy = (link) => {
    console.log('Link', link);
    this.setState({ orderID: link })
    this.setState({ openB: true, previousActive: this.state.active });
  };

  closeBuy = () => {
    this.setState({
      openB: false,
      active: this.state.previousActive,
    });
    this.getOrderBook();
    this.getRecentTrades();
  };

  openList = () => {
    this.setState({ openL: true, previousActive: this.state.active });
  };

  closeList = () => {
    this.setState({
      openL: false,
      active: this.state.previousActive,
    });
    this.getOrderBook();
    this.getRecentTrades();
  };

  openUnlist = () => {
    this.setState({ openU: true, previousActive: this.state.active });
  };

  closeUnlist = () => {
    this.setState({
      openU: false,
      active: this.state.previousActive,
    });
    this.getOrderBook();
    this.getRecentTrades();
  };

  buyOrder = () => { };

  getRecentTrades = async () => {
    const exchange = await Exchange.deployed();
    var _trades = [];

    let transferEvent = await exchange.Sale(
      {},
      { fromBlock: 0, toBlock: 'latest' }
    );

    await transferEvent.get((error, logs) => {
      console.log(logs.length);
      for (let i = logs.length - 1; i >= Math.max(logs.length - 10, 0); i--) {
        _trades.push([logs[i].args['_token'].toString(), logs[i].args['_amount'].toString(), (logs[i].args['_price']/1e18).toString()]);
      }
      if (logs.length === 0) {
        console.log('setting');
        _trades = [['No Recent Trades', '...', '...']];
      }
    });
    return _trades;
  };

  getOrderBook = async () => {
    const factory = await Factory.at("0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642");
    //orderbook

    // first get number of open books (tokens with open orders):
    let exchange = await Exchange.deployed();
    let numBooks = await exchange.getBookCount();

    // get orders for that book:
    let o_row = [];
    let allrows = [];

    let order;
    for (let i = 0; i < numBooks; i++) {
      let book = await exchange.openBooks(i);
      let orders = await exchange.getOrders(book);

      for (let j = 0; j < orders.length; j++) {
        if (orders[j].c[0] > 0) {
          order = await exchange.getOrder(orders[j].c[0]);
          var _date = await factory.token_dates.call(book);
          _date = new Date(_date * 1000);
          _date = (_date.getMonth() + 1) + '/' + (_date.getDate()+1) + '/' + _date.getFullYear()
          o_row = [orders[j].c[0].toString(), order[3], (order[1].c[0] / 10000).toString(), order[2].c[0].toString(), _date.toString()];
          allrows.push(o_row);
        }
      }
    }
    console.log('arows', allrows);
    return allrows;
  };

  render() {
    return (
      <div>
        <div className='wrapper'>
          <div className='order-book'>
            <Table
              titles={['Order ID','Token','Price (ETH)','Quantity','Start Date']}
              rows={this.state.orderbook}
              clickFunction={this.openContractDetails}
            />
          </div>
          <div className='order-buttons'>
            <ul className="bulletin-order-btns-wrapper">
              <li>
                <Button className="bulletin-order-btn" onClick={this.openList}>
                  <Typography className="bulletin-order-btn-txt">List Order</Typography>
                </Button>
              </li>
              <li>
                <Button className="bulletin-order-btn" onClick={this.openBuy}>
                  <Typography className="bulletin-order-btn-txt">Buy Order</Typography>
                </Button>
              </li>
              <li>
                <Button className="bulletin-order-btn" onClick={this.openUnlist}>
                  <Typography className="bulletin-order-btn-txt">Unlist Order</Typography>
                </Button>
              </li>
            </ul>
            <Table
              titles={['Recent Trades', 'Volume', 'Price (ETH)']}
              rows={this.state.recentTrades}
              cellHeight="15px"
              fontSize="12px"
              clickFunction={this.onBuyClick} />
          </div>
          <div className='price-chart'>
            <PriceChart />
          </div>
        </div>
        <ContractDetails
          open={this.state.open}
          toggle={this.closeContractDetails}
          contractAddress={this.state.contractAddress}
          contractDuration={this.state.contractDuration}
          contractMultiplier={this.state.contractMultiplier}
          oracleAddress={this.state.oracleAddress}
        />
        <List
          open={this.state.openL}
          toggle={this.closeList}
        />
        <Unlist
          myAccount={this.state.myAccount}
          open={this.state.openU}
          toggle={this.closeUnlist}
        />
        <Buy
          orderID={this.state.orderID}
          open={this.state.openB}
          toggle={this.closeBuy}
        />
      </div>
    );
  }
}
export default Bulletin;
