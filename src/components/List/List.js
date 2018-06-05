import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import { DatePicker } from 'material-ui-pickers';
import { CircularProgress } from 'material-ui/Progress';
import styles from './styles';
import Dropdown from '../Dropdown';
import { Factory, token, DRCT, web3, Exchange } from '../../ethereum';

class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      open: false,
      selectedToken: "",
      amount: "",
      price: "",
      loading: false,
      disabled: false,
      created: false,
      myTokens: [],
      showList:false,
      txId:"",
      approval:""
    };
  }
  componentWillMount() {
    this.getMyPositions();
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  getMyPositions = async () => {
    const factory = await Factory.at("0xa2eb63e0f0e7f2ead726f5d1d6cf06dc8b5e87b5");
    const accounts = await web3.eth.getAccounts();
    const numDates = await factory.getDateCount();
    let _allrows = [];
    let openDates = [];
    for (let i = 0; i < numDates; i++) {
      const startDates = (await factory.startDates.call(i)).c[0];
      const _token_addresses = await factory.getTokens(startDates);
      let _date = new Date(startDates * 1000);
      _date = (_date.getMonth() + 1) + '/' + _date.getDate() + '/' + _date.getFullYear();
      for(let j=0;j<_token_addresses.length;j++){
        const drct = await DRCT.at(_token_addresses[j]);//Getting contract
        const _balance = (await drct.balanceOf(accounts[0])).c[0];//Getting balance of token
        if (_balance > 0) {
          _allrows.push(_token_addresses[j] + '(' + _balance + '/' + _date + ')'); //Pushing token address + balance/date
        }
      }
    }
    console.log("mytokens",_allrows);
    _allrows.length?
    this.setState({
      myTokens: _allrows,
      selectedToken: _allrows[0],
    })
    :this.setState({ myTokens: ["No Current Positions"] });
  }

  approveOrder = async () => {
    const accounts = await web3.eth.getAccounts();
    const exchange = await Exchange.deployed();
    const tokenSel = this.state.selectedToken.split('(')[0].replace(/['"]+/g, '');
    const drct = await DRCT.at(tokenSel);
    let response, error;
    this.setState({loading: true, disabled: true, showApproval: true});
    console.log('inputs',exchange.address,this.state.amount)
    try {
      response = await drct.approve(exchange.address,this.state.amount, {
        from: accounts[0],
        gas: 4000000,
      });
      /*Handle Success Here*/
      this.setState({
        showList: true,
        txId: response.tx,
        approval: "Order approval confirmed",
        loading:false,
      });
    } catch (error) {
      /*Handle error here*/
      this.setState({
        txId: error.tx, 
        error: true, 
        disabled: false,
        loading: false,
        approval: "Error approving order",
      });
    }
  };

  listOrder = async () => {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();
    const tokenSel = this.state.selectedToken.split('(')[0].replace(/['"]+/g, '');
    let response, error;
    exchange.list(tokenSel, this.state.amount, this.state.price * 1e18, {
        from: accounts[0],
        gas: 4000000
      }).then((res,err) =>{
        if(err){
          console.log('Error Message:', err);
        }else{
          console.log("RESPONSE",res);
        }
    })
    this.props.toggle
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
              <Typography className={classes.title}>Place Order</Typography>
              <Grid item>
                <Dropdown
                  menuItems={this.state.myTokens}
                  value={this.state.selectedToken || "Select a Token"}
                  name="selectedToken"
                  onChange={this.handleChange}
                  className={classes.selectedToken}
                />
              </Grid>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Price (in Ether)</Typography>

              <TextField
                id="price"
                value={Number(this.state.price)}
                type="number"
                onChange={this.handleTextfieldChange('price')}
                className={classes.fullWidth}
                helperText="Enter the price in Ether (e.g. 0.1)"
              />
            </div>


            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Amount</Typography>

              <TextField
                id="amount"
                value={Number(this.state.amount)}
                type="number"
                onChange={this.handleTextfieldChange('amount')}
                className={classes.fullWidth}
                helperText="Enter the amount of the token to sell"
              />
            </div>

            <Button
              className={
                this.state.disabled ? classes.buttonDisabled : classes.button
              }
              disabled={this.state.disabled}
              onClick={this.approveOrder}
            >
              <Typography className={classes.buttonText}>
                Submit for Approval
              </Typography>
            </Button>
          </DialogContent>

                    {this.state.showApproval && <div className={classes.line} />}
          {this.state.showApproval && (
            <DialogContent className={classes.approvalContainer}>
              <div className={classes.inputContainer}>
                <Grid
                  container
                  direction="row"
                  alignItems="stretch"
                  justify="space-between"
                >
                  <Grid item>
                    <Typography className={classes.title}>
                      Approval
                    </Typography>
                  </Grid>

                  <Grid item>
                    {this.state.loading && (
                      <Grid container direction="row" alignItems="stretch">
                        <Grid item>
                          <Typography className={classes.waiting}>
                            Waiting for confirmation...
                          </Typography>
                        </Grid>

                        <Grid item>
                          <CircularProgress
                            className={classes.progress}
                            size={12}
                            thickness={5}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                {this.state.approval && (
                  <Typography className={classes.approval}>
                    {this.state.approval}
                  </Typography>
                )}
              </div>
            </DialogContent>
          )}

          {this.state.showList && <div className={classes.line} />}
          {this.state.showList && (
            <DialogContent className={classes.listContainer}>
              <Button className={classes.button} onClick={this.listOrder}>
                <Typography className={classes.buttonText}>
                  List Order
                </Typography>
              </Button>
            </DialogContent>
          )}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(List);
