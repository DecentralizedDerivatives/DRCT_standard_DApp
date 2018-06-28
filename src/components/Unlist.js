import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import Dropdown from './Dropdown';
import { Factory, Exchange, web3 } from '../ethereum';
import '../styles/unlist.css';

class Unlist extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedToken: 'xxx',
      loading: false,
      disabled: false,
      created: false,
      myOrders: [],
      orderLabels: [],
      myAccount: '',
      orderID: ''
    };
  }

  componentWillMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });
    this.getMyOrders();
  }

  // handleDropdownChange = event => {
  //   this.state.orderLabels.forEach((label, index) => {
  //     if (label === event.target.value) {
  //       this.setState({
  //         selectedToken: event.target.value,
  //         orderID: this.state.myOrders[index].id
  //       });
  //       0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642;
  //     }
  //   });
  // };
  //
  // handleFieldChange = e => {
  //   this.setState({
  //     orderID: e.target.value
  //   });
  // };

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */

  getMyOrders = async () => {
    const exchange = await Exchange.deployed();
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );
    try {
      const books = await exchange.getUserOrders.call(this.state.myAccount); //Gets all listed order ids
      const allOrders = []; //Contains all information for each order
      const allOrderLabels = []; //Contains only what's going to be displayed in dropdown
      for (let i = 0; i < books.length; i++) {
        //Getting all info for orders in book and storing them in an object
        const order = {};
        order.id = books[i].c[0];
        order.info = await exchange.getOrder(order.id); //Getting order info by order Id (returns array);
        order.owner = order.info[0];
        order.price = order.info[1].c[0] / 10000; //divided by 10000 to fix offset
        order.owned = order.info[2].c[0];
        order.address = order.info[3];
        order.date = await factory.token_dates.call(order.address);
        order.date = new Date(order.date * 1000);
        order.date =
          order.date.getMonth() +
          1 +
          '/' +
          order.date.getDate() +
          '/' +
          order.date.getFullYear();
        order.row = order.address + '(' + order.owned + '/' + order.date + ')';
        allOrders.push(order);
        allOrderLabels.push(order.row);
      }
      allOrderLabels.length
        ? this.setState({
            orderLabels: allOrderLabels,
            selectedToken: allOrderLabels[0],
            myOrders: allOrders,
            orderID: allOrders[0].id
          })
        : this.setState({ selectedToken: 'No orders listed' });
    } catch (err) {
      console.log('Error getting listed orders', err);
    }
  };

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  unlistOrder = async () => {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();
    let response, error;
    console.log(this.state.orderID);
    console.log(accounts[0]);
    try {
      await exchange.unlist(this.state.orderID, {
        from: accounts[0],
        gas: 4000000
      });
    } catch (err) {
      error = err;
    }
    if (error) {
      console.log(error);
    }
  };

  toggleFormVisibility() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div className="container">
        <div id="buy-button">
          <button onClick={this.toggleFormVisibility}>Unlist Order</button>
        </div>

        <Collapse isOpen={this.state.collapse}>
          <div id="unlist-form">
            <h4 className="center-text">Unlist Confirmation</h4>
            <UnlistForm
              name="unlistOrderID"
              onSubmit={this.unlistOrder}
              dropdownValue={this.state.selectedToken}
              dropdownData={this.state.orderLabels}
              onDropdownChange={this.handleChange}
              inputValue={Number(this.state.orderID)}
              onInputChange={this.handleFieldChange}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

Unlist.propTypes = {
  myAccount: PropTypes.string
};

export default Unlist;
