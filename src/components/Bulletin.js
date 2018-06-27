import React, { Component } from 'react';
import OrderBook from './OrderBook';
import RecentTrades from './RecentTrades';
import ContractDetails from './ContractDetails';
import PriceChart from './PriceChart';
import List from './List';
import Unlist from './Unlist';
import Buy from './Buy';
import '../styles/bulletin.css';

import { Factory, Exchange, web3 } from '../../ethereum';

class Bulletin extends Component {
  constructor() {
    super();
    this.state = {
      previousActive: '',
      recentTrades: [['loading...', 'loading...', 'loading...']],
      active: '',
      open: false,
      openU: false,
      openL: false,
      openB: false,
      orderID: 'xxx',
      myAccount: 'xxx',
      contractAddress: '',
      contractDuration: '',
      contractMultiplier: '',
      oracleAddress: '',
      selectedTokenAddress: ''
    };
  }
  fetchData = () => {};
  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
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

  onBuyClick = link => {
    console.log(link);
  };

  openContractDetails = (newActive, token_address = false) => {
    if (token_address) {
      this.setState({
        active: newActive,
        open: true,
        previousActive: this.state.active,
        selectedTokenAddress: token_address
      });
    } else {
      this.setState({
        active: newActive,
        open: true,
        previousActive: this.state.active
      });
    }
  };

  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive
    });
  };

  openBuy = link => {
    this.setState({ orderID: link });
    this.setState({ openB: true, previousActive: this.state.active });
  };

  closeBuy = () => {
    this.setState({
      openB: false,
      active: this.state.previousActive
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
      active: this.state.previousActive
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
      active: this.state.previousActive
    });
    this.getOrderBook();
    this.getRecentTrades();
  };

  buyOrder = () => {};

  render() {
    return (
      <div>
        <div className="wrapper">
          <OrderBook />

          <div className="order-buttons">
            <ul className="bulletin-order-btns-wrapper">
              <li>
                <button className="bulletin-order-btn" onClick={this.openList}>
                  <span className="bulletin-order-btn-txt">List Order</span>
                </button>
              </li>
              <li>
                <button className="bulletin-order-btn" onClick={this.openBuy}>
                  <span className="bulletin-order-btn-txt">Buy Order</span>
                </button>
              </li>
              <li>
                <button
                  className="bulletin-order-btn"
                  onClick={this.openUnlist}
                >
                  <span className="bulletin-order-btn-txt">Unlist Order</span>
                </button>
              </li>
            </ul>
          </div>

          <RecentTrades />

          <div className="price-chart">
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
          tokenAddress={this.state.selectedTokenAddress}
        />

        <List open={this.state.openL} toggle={this.closeList} />
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
