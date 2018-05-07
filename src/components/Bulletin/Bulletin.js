import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import styles from './styles';
import Table from '../Table';
import ContractDetails from '../ContractDetails';
import PriceChart from '../PriceChart';
import {Factory, Exchange, web3} from '../../ethereum';

class Bulletin extends Component {
  state = {
    orderbook: [["loading...","loading...","loading...","loading..."]],
    previousActive: '',
    active: '',
    open: false
  };

  fetchData = () => {};

  componentDidMount() {
    console.log('did mount');
    this.getOrderBook().then((result)=>{
      this.setState({orderbook:result});
      console.log('result',result);
    });
    
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
    this.setState({active: link});
  };


    openContractDetails = () => {
    this.setState({open: true, previousActive: this.state.active});
  };

  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  getOrderBook = async () => {
    const factory = await Factory.deployed();
    const numDates = await factory.getDateCount();

    var openDates = [];

    for (let i = 0; i < numDates; i++) {
      openDates.push(await factory.startDates.call(i));
    }

    //orderbook

    // first get number of open books (tokens with open orders):
    let exchange = await Exchange.deployed();
    let numBooks = await exchange.getBookCount();

    // get orders for that book:
    let o_row = [];
    let allrows = []

    let order;
    for (let i = 0; i < numBooks; i++) {
      let book = await exchange.openBooks(i);
      let orders = await exchange.getOrders(book);

      for (let i in orders) {
        if(i > 0){
          order = await exchange.getOrder(i);
          var _date = new Date(openDates[i].c[0]*1000);
          var _date = _date.getMonth() + '/' + _date.getDate() + '/' + _date.getFullYear() 
          o_row = [order[3],order[1].c[0].toString(),order[2].c[0].toString(),_date.toString()];
          allrows.push(o_row);
        }

      }
    }
    console.log('arows',allrows);
    return allrows;
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        alignItems="stretch"
        justify="center"
      >
        <Grid item className={classes.item}>
          <Table
            titles={[
              'Order Book',
              'Amount',
              'Bid',
              'Start Date',
            ]}
            rows={this.state.orderbook}
            tableWidth="950px"
            clickFunction = {this.onClickRow}
          />
        </Grid>
        <Grid item className={classes.item}>
          <PriceChart />
        </Grid>
        <Grid item className={classes.item}>
          <Table
            titles={['Recent Trades', 'Volume', 'Price']}
            rows={[
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
            ]}
            tableWidth="400px"
            cellHeight="15px"
            fontSize="12px"
            clickFunction = {this.onClickRow}
          />
        </Grid>
                 <ContractDetails
          open={this.state.open}
          toggle={this.closeContractDetails}
      />
      </Grid>
    );
  }
}

Bulletin.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Bulletin);
