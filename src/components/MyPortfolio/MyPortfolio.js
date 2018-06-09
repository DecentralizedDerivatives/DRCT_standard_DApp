import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import styles from './styles';
import Table from '../Table';
import ContractDetails from '../ContractDetails';
import { Factory, Exchange, web3, DRCT } from '../../ethereum';

class MyPortfolio extends Component {
  constructor() {
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
  fetchData = () => { };

  componentDidMount() {
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ myAccount: accounts[0] });
    });
    this.getMyPositions().then(result => {
      this.setState({ myPositions: result });
      console.log(result);
    });
    this.getmyTransactions();
    //Getting contract details one time when its parent gets mounted
    this.getContractDetails();
  }

  onClickRow = link => {
    this.openContractDetails();
    this.setState({ active: link });
  };

  openContractDetails = () => {
    this.setState({ open: true, previousActive: this.state.active });
  };
  getContractDetails = async () => {
    const factory = await Factory.at("0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642");
    let response, error;
    try {
      response = await factory.getVariables();
    } catch (err) {
      error = err;
    }
    if (error) {
      console.log(error);
      return;
    }
    this.setState({
      contractAddress: response[0],
      contractDuration: response[1].c[0],
      contractMultiplier: response[2].c[0],
      oracleAddress: response[3],
    });
  };
  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  openContractDetails = () => {
    this.setState({ open: true, previousActive: this.state.active });
  };

  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  getMyPositions = async () => {
    const factory = await Factory.at("0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642");
    var _allrows = [];
    var openDates = [];
    const numDates = await factory.getDateCount();
    for (let i = 0; i < numDates; i++) {
      const startDates = (await factory.startDates.call(i)).c[0];
      const _token_addresses = await factory.getTokens(startDates);
      let _date = new Date(startDates * 1000);
      _date = (_date.getMonth() + 1) + '/' + _date.getDate() + '/' + _date.getFullYear();
      for (let j = 0; j < _token_addresses.length; j++) {
        let drct = await DRCT.at(_token_addresses[j]);
        let _balance = await drct.balanceOf(this.state.myAccount);
        if (_balance.c[0] > 0) {
          _allrows.push([
            _token_addresses[j],
            _balance.c[0].toString(),
            _date.toString(),
          ]);
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
    const factory = await Factory.at("0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642")
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
          { fromBlock: 0, toBlock: 'latest' }
        ),
        //Transfer: await drct.Transfer({}, {fromBlock:0, toBlock: 'latest'}),
        //Approval: await drct.Approval({}, {fromBlock:0, toBlock: 'latest'})
      },
    ];

    for (let i = 0; i < titles.length; i++) {
      let transferEvent = await factory.ContractCreation(
        {},
        { fromBlock: 0, toBlock: 'latest' }
      );
      await transferEvent.get((error, logs) => {
        for (let j = logs.length - 1; j >= Math.max(logs.length - 10, 0); j--) {
          if (
            logs[i].args['_sender'].toUpperCase() ==
            this.state.myAccount.toUpperCase()
          ) {
            _trades.push([titles[i], logs[j].transactionHash]);
            this.setState({ myTransactions: _trades });
          }
        }
        if (_trades.length === 0) {
          _trades = [['No Recent Events', '...']];
        }
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        alignItems="center"
        align="center"
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
            tableWidth="950px"
            cellHeight="15px"
            fontSize="12px"
            clickFunction={this.onClickRow}
          />
        </Grid>
        <ContractDetails
          open={this.state.open}
          toggle={this.closeContractDetails}
          contractAddress={this.state.contractAddress}
          contractDuration={this.state.contractDuration}
          contractMultiplier={this.state.contractMultiplier}
          oracleAddress={this.state.oracleAddress}
        />
      </Grid>
    );
  }
}

MyPortfolio.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MyPortfolio);
