import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import TextField from '../TextField';
import Grid from 'material-ui/Grid';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';
import './unlistStyles.css';
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
  handleChange = event => {
    this.state.orderLabels.forEach((label, index) => {
      if (label === event.target.value) {
        this.setState({
          selectedToken: event.target.value,
          orderID: this.state.myOrders[index].id
        });
        0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642;
      }
    });
  };
  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
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
              <p className="input-title">Select order from dropdown :</p>
              <Grid item>
                <Dropdown
                  menuItems={this.state.orderLabels}
                  value={this.state.selectedToken}
                  name="selectedToken"
                  onChange={this.handleChange}
                  className={classes.selectedToken}
                />
              </Grid>
            </div>
            <div className="input-container">
              <p className="input-title">Or enter order ID:</p>
              <TextField
                id="orderID"
                value={Number(this.state.orderID)}
                type="number"
                onChange={this.handleTextfieldChange('orderID')}
                className="full-width"
                helperText="Enter the orderID"
              />
            </div>
            <button
              className={this.state.disabled ? 'button-disabled' : 'button'}
              disabled={this.state.disabled}
              onClick={this.unlistOrder}
            >
              <span className="button-text">Submit</span>
            </button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Unlist);
