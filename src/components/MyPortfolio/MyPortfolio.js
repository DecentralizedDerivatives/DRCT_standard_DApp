import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import styles from './styles';
import Table from '../Table';
import ContractDetails from '../ContractDetails';
import {Factory, Exchange, web3, DRCT} from '../../ethereum';

class MyPortfolio extends Component {
  constructor(){
    super();
    this.state = {
      previousActive: '',
      active: '',
      open: false,
      myPositions: [['loading...', 'loading...', 'loading...']],
      myTransactions: [['loading...', 'loading...']],
      myAccount: '',
    };
  }
  fetchData = () => {};

  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({myAccount: accounts[0]});
    });
    this.getMyPositions().then(result => {
      this.setState({myPositions: result});
      console.log(result);
    });
    this.getmyTransactions();
  }

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

  openContractDetails = () => {
    this.setState({open: true, previousActive: this.state.active});
  };

  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  getMyPositions = async () => {
    const factory = await Factory.deployed();
    var _row = [];
    var _allrows = [];
    var openDates = [];
    const numDates = await factory.getDateCount();
    for (let i = 0; i < numDates; i++) {
      let _date = await factory.startDates.call(i);
      _date = _date.c[0];
      let _token_addresses = await factory.getTokens(_date);
      var _date = new Date(_date * 1000);
      var _date =
        _date.getMonth() +
        1 +
        '/' +
        _date.getDate() +
        '/' +
        _date.getFullYear();
      for (let j = 0; j < 2; j++) {
        let drct = await DRCT.at(_token_addresses[j]);
        let _balance = await drct.balanceOf(this.state.myAccount);
        if (_balance.c[0] > 0) {
          _row = [
            _token_addresses[j],
            _balance.c[0].toString(),
            _date.toString(),
          ];
          _allrows.push(_row);
        }
      }
    }
    if (_allrows.length === 0) {
      console.log('setting');
      _allrows = [['No Current Positions', '...', '...']];
    }
    return _allrows;
  };

  getmyTransactions = async () => {
    const exchange = await Exchange.deployed();
    const factory = await Factory.deployed();
    let drct;
    let _trades = [];
    var titles = ['ContractCreation']; //Add other ATS when redeployed
    var ats = [
      {
        //Sale: await exchange.Sale({}, {fromBlock:0, toBlock: 'latest'}),
        //OrderPlaced: await exchange.OrderPlaced({}, {fromBlock:0, toBlock: 'latest'}),
        //OrderRemoved: await exchange.OrderRemoved({}, {fromBlock:0, toBlock: 'latest'}),
        ContractCreation: await factory.ContractCreation(
          {},
          {fromBlock: 0, toBlock: 'latest'}
        ),
        //Transfer: await drct.Transfer({}, {fromBlock:0, toBlock: 'latest'}),
        //Approval: await drct.Approval({}, {fromBlock:0, toBlock: 'latest'})
      },
    ];

    for (let i = 0; i < titles.length; i++) {
      let transferEvent = await factory.ContractCreation(
        {},
        {fromBlock: 0, toBlock: 'latest'}
      );
      await transferEvent.get((error, logs) => {
        for (let j = logs.length - 1; j >= Math.max(logs.length - 10, 0); j--) {
          if (
            logs[i].args['_sender'].toUpperCase() ==
            this.state.myAccount.toUpperCase()
          ) {
            _trades.push([titles[i], logs[j].transactionHash]);
            this.setState({myTransactions: _trades});
          }
        }
        if (_trades.length === 0) {
          _trades = [['No Recent Events', '...']];
        }
      });
    }
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
            titles={['My Tokens', 'Balance', 'Start Date']}
            rows={this.state.myPositions}
            tableWidth="950px"
            clickFunction={this.onClickRow}
          />
        </Grid>
        <Grid item className={classes.item}>
          <Table
            titles={['My Transactions', 'Transaction Hash']}
            rows={this.state.myTransactions}
            tableWidth="400px"
            cellHeight="15px"
            fontSize="12px"
            clickFunction={this.onClickRow}
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

MyPortfolio.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MyPortfolio);
