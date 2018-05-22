import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';
import Dropdown from '../Dropdown';
import { Factory, Exchange, web3 } from '../../ethereum';

class Unlist extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    myAccount: PropTypes.string
  };
  constructor() {
    super();
    this.state = {
      open: false,
      selectedToken: 'xxx',
      loading: false,
      disabled: false,
      created: false,
      myOrders: [],
      myAccount: "",
      orderID: "",
    }
  }
  componentWillMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });
    this.getMyOrders();
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  getMyOrders = async () => {
    const exchange = await Exchange.deployed();
    const factory = await Factory.deployed();
    try {
      const books = await exchange.getUserOrders.call(this.state.myAccount);
      console.log("exchange",exchange);
      console.log("books",books);
      console.log("act",this.state.myAccount);
      // get orders for that book:
      let o_row = [];
      let _allrows = [];
      let order;
      for (let j in books) {
        order = await exchange.getOrder(j);
        let _date = await factory.token_dates.call(order[3]);
        _date = new Date(_date * 1000);
        _date = ((_date.getMonth() + 1) + '/' + _date.getDate() + '/' + _date.getFullYear());
        o_row = (j.toString() + '(' + order[3], order[1].c[0].toString() + '/' + order[2].c[0].toString() + '/' + _date.toString() + ')');
        _allrows.push(o_row);
      }
      this.setState({ myOrders: _allrows });
      console.log("orders",this.state.myOrders);
    } catch (err) {
      console.log('Error getting orders', err);
    }
  }
  unlistOrder = async () => {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();
    let response, error;
    console.log(this.state.orderID);
    console.log(accounts[0])
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
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Unlist Order ID:</Typography>
              <TextField
                id="orderID"
                value={Number(this.state.orderID)}
                type="number"
                onChange={this.handleTextfieldChange('orderID')}
                className={classes.fullWidth}
                helperText="Enter the orderID"
              />
            </div>
            <Button
              className={
                this.state.disabled ? classes.buttonDisabled : classes.button
              }
              disabled={this.state.disabled}
              onClick={this.unlistOrder}
            >
              <Typography className={classes.buttonText}>
                Submit
              </Typography>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Unlist);
