import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';
import './cashOutStyles.css';
import { Wrapped, web3 } from '../../ethereum';

class CashOut extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      open: false,
      duration: '',
      currency: '',
      amount: 0.1,
      selectedDate: new Date(),
      loading: false,
      disabled: false,
      created: false,
      myBalance: '0'
    };
  }
  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

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
      error = err;
    }
    if (error) {
      console.log(error);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggle}
          PaperProps={{ className: classes.paper }}
        >
          <DialogContent className={classes.dialogContent}>
            <div className="input-container">
              <p className="input-title">Cash Out</p>
            </div>

            <div className="input-container">
              <p className="input-title">
                Amount to withdraw: {this.state.myBalance}
              </p>
            </div>

            <button className="button" onClick={this.cashOut}>
              <span className="button-text">Submit</span>
            </button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CashOut);
