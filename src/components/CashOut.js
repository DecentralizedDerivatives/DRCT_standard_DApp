import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CashOutForm from './CashOutForm';
import { Wrapped, web3 } from '../ethereum';
import '../styles/cashOut.css';

class CashOut extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      myBalance: '0'
    };
  }

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };
  //
  // handleDateChange = date => {
  //   this.setState({ selectedDate: date });
  // };
  //
  // handleTextfieldChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value
  //   });
  // };

  componentWillMount() {
    this.getMyBalance().then(result => {
      console.log('res', result);
    });
  }

  getMyBalance = async () => {
    const wrapped = await Wrapped.deployed();
    const accounts = await web3.eth.getAccounts();
    var _res = await wrapped.balanceOf(accounts[0]);
    return _res.c[0];
  };

  // Move into action
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
  toggleFormVisibility = e => {
    const cashoutFrm = document.getElementById('cashout-form');

    cashoutFrm.style.display =
      cashoutFrm.style.display === 'none' ? 'block' : 'none';
  };

  render() {
    return (
      <div className="container">
        <div id="cashout-button">
          <button onClick={this.toggleFormVisibility}>Cash Out</button>
        </div>

        <div id="cashout-form">
          <h4 className="center-text">Cash Out Request</h4>
          <CashOutForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default CashOut;
