import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Dialog, {DialogContent} from 'material-ui/Dialog';
import {DatePicker} from 'material-ui-pickers';
import {CircularProgress} from 'material-ui/Progress';
import styles from './styles';
import Dropdown from '../Dropdown';
import {Factory, token,DRCT, web3, Exchange} from '../../ethereum';

class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  state = {
    open: false,
    selectedToken: '',
    amount:"",
    price:"",
    loading: false,
    disabled: false,
    created: false,
    myTokens:[]
  };

    componentDidMount() {
      this.getMyPositions();
    }


  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getMyPositions = async () =>{
    const factory = await Factory.deployed();
    const accounts = await web3.eth.getAccounts();
    let _row;
    var _allrows = [];
    var openDates = [];
    const numDates = await factory.getDateCount();
    console.log('numDates',numDates);
          for(let i=0;i<numDates;i++){
              let _date = await factory.startDates.call(i);
              _date = _date.c[0]; 
              let _token_addresses = await factory.getTokens(_date);
                var _date = new Date(_date*1000);
                var _date = (_date.getMonth() + 1) + '/' + _date.getDate() + '/' + _date.getFullYear() 
              for(let j=0;j<2;j++){
                  let drct = await DRCT.at(_token_addresses[j]);
                  let _balance = await drct.balanceOf(accounts[0]);
                  if(_balance.c[0]>0){
                    _row = _token_addresses[j] + '('+_balance.c[0].toString()+'/'+_date.toString()+')';
                    _allrows.push(_row)
                    this.setState({myTokens: _allrows});
                    if(_allrows.length == 1){
                        this.setState({selectedToken:_token_addresses[j]});
                    }
                  }
              }
       }
        if(this.state.myTokens.length == 0){
              this.setState({myTokens: ["No Current Positions"]});
        }

  }

  listOrder= async () => {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();
    var string = this.state.selectedToken;
    var tokenSel = string.split('(');


    let response, error;
    console.log(this.state.price);
    console.log('INPUTS',tokenSel[0].replace(/['"]+/g, ''),this.state.amount,this.state.price*1e18);
    try {
      response = await exchange.list(tokenSel[0].replace(/['"]+/g, ''),this.state.amount,this.state.price*1e18,{
        from: accounts[0],
        gas: 4000000,
      });
    } catch (err) {
      error = err;
    }
    if (error) {
      console.log(error);
    }
  };
  render() {
    const {classes} = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggle}
          PaperProps={{className: classes.paper}}
        >
          <DialogContent className={classes.dialogContent}>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Place Order</Typography>
                <Grid item>
                  <Dropdown
                    menuItems={this.state.myTokens}
                    value={this.state.selectedToken}
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
              onClick={this.listOrder}
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

export default withStyles(styles)(List);
