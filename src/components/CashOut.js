import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import CashOutForm from './CashOutForm';
import { Wrapped, web3 } from '../ethereum';
import '../styles/cashOut.css';

class CashOut extends Component {
  constructor() {
    super();
    this.state = {
      myBalance: '0',
      collapse: false
    };
  }

  componentWillMount() {
    // ????
    this.getMyBalance().then(result => {
      console.log('res', result);
    });
  }

  // handleChange = e => {
  //   this.setState({
  //     myBalance: e.target.value
  //   });
  // };

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  getMyBalance = async () => {
    const wrapped = await Wrapped.deployed();
    const accounts = await web3.eth.getAccounts();
    var _res = await wrapped.balanceOf(accounts[0]);
    return _res.c[0];
  };

  /**
   * METHOD FOR ACTION CONVERSION
   *
   */
  cashOut = async () => {
    const wrapped = await Wrapped.deployed();
    const accounts = await web3.eth.getAccounts();
    let response, error;
    try {
      await wrapped.withdraw(this.state.myBalance, {
        from: accounts[0],
        gas: 4000000
      });
    } catch (err) {
      console.log(err);
      return err;
    }

    // TODO - show success or error message
    // On success, redirect to portfolio
    // {
    //   this.props.toggle;
    // }
  };

  onSubmit = value => {
    // call action available thru mapDispatchToProps
    this.props.cashOut();
  };

  // Toggle form visibility on button click
  toggleFormVisibility() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div className="container">
        <div id="cashout-button">
          <button onClick={this.toggleFormVisibility}>Cash Out</button>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <div id="cashout-form">
            <h4 className="center-text">Cash Out Request</h4>
            <CashOutForm onSubmit={this.cashOut} value={this.state.myBalance} />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default CashOut;
