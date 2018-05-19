import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import styles from './styles';
import Table from '../Table';
import ContractDetails from '../ContractDetails';
import PriceChart from '../PriceChart';
import List from '../List';
import Unlist from '../Unlist';
import Buy from '../Buy';
import {Factory, Exchange, web3} from '../../ethereum';

class Bulletin extends Component {
  constructor(){
    super();
    this.state = {
      orderbook: [['loading...', 'loading...', 'loading...', 'loading...','...']],
      previousActive: '',
      recentTrades: [['loading...', 'loading...', 'loading...']],
      active: '',
      open: false,
      openU: false,
      openL: false,
      openB: false,
      orderID: "xxx",
      myAccount:"xxx"
    };
  }
  fetchData = () => {};
  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({myAccount: accounts[0]});
    });
    this.getOrderBook().then(result => {
      this.setState({orderbook: result});
    });
    this.getRecentTrades().then(res => {
            this.setState({recentTrades: res});
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

  onBuyClick = link => {
    console.log(link);
  }

  openContractDetails = () => {
    this.setState({open: true, previousActive: this.state.active});
  };

  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  openBuy = (link) => {
     console.log('Link',link);
    this.setState({orderID:link})
    this.setState({openB: true, previousActive: this.state.active});
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
    this.setState({openL: true, previousActive: this.state.active});
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
    this.setState({openU: true, previousActive: this.state.active});
  };

  closeUnlist = () => {
    this.setState({
      openU: false,
      active: this.state.previousActive,
    });
    this.getOrderBook();
    this.getRecentTrades();
  };

  buyOrder = () => {};

  getRecentTrades = async () => {
    const exchange = await Exchange.deployed();
    var _trades = [];

    let transferEvent = await exchange.Sale(
      {},
      {fromBlock: 0, toBlock: 'latest'}
    );

    await transferEvent.get((error, logs) => {
      console.log(logs.length);
      for (let i = logs.length - 1; i >= Math.max(logs.length - 10, 0); i--) {
        _trades.push([logs[i].args['_token'].toString(),logs[i].args['_amount'].toString(),logs[i].args['_price'].toString()]);
      }
      if (logs.length === 0) {
        console.log('setting');
        _trades = [['No Recent Trades', '...', '...']];
      }
    });
            return _trades;
  };

  getOrderBook = async () => {
    const factory = await Factory.deployed();
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

      for (let j=0; j<orders.length;j++) {
        if(orders[j].c[0] > 0){
          order = await exchange.getOrder(orders[j].c[0]);
          var _date = await factory.token_dates.call(book);
          _date = new Date(_date * 1000);
          _date = (_date.getMonth()+1) + '/' + _date.getDate() + '/' + _date.getFullYear() 
          o_row = [orders[j].c[0].toString(),order[3],(order[1].c[0]/10000).toString(),order[2].c[0].toString(),_date.toString()];
          allrows.push(o_row);
        }
      }
    }
    console.log('arows', allrows);
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
              'Order ID',
              'Token',
              'Price (ETH)',
              'Quantity',
              'Start Date',
            ]}
            rows={this.state.orderbook}
            tableWidth="950px"
            clickFunction={this.openContractDetails}
          />
        </Grid>
        <Grid item className={classes.item}>
          <PriceChart />
        </Grid>
        <Grid item className={classes.item}>
          <Table
            titles={['Recent Trades', 'Volume', 'Price']}
            rows={this.state.recentTrades}
            tableWidth="400px"
            cellHeight="15px"
            fontSize="12px"
            clickFunction={this.onBuyClick}
          />
        </Grid>

        <Grid item className={classes.item}>
          <Button className={classes.button} onClick={this.openList}>
            <Typography className={classes.buttonText}>List Order</Typography>
          </Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button className={classes.button} onClick={this.openBuy}>
            <Typography className={classes.buttonText}>Buy Order</Typography>
          </Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button className={classes.button} onClick={this.openUnlist}>
            <Typography className={classes.buttonText}>Unlist Order</Typography>
          </Button>
        </Grid>

        <ContractDetails
          open={this.state.open}
          toggle={this.closeContractDetails}
      />
     <List
          open={this.state.openL}
          toggle={this.closeList}
      />      
        <Unlist
          myAccount ={this.state.myAccount}
          open={this.state.openU}
          toggle={this.closeUnlist}
      />

      <Buy
          orderID = {this.state.orderID}
          open={this.state.openB}
          toggle={this.closeBuy}
      />


      </Grid>
    );
  }
}

Bulletin.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Bulletin);
