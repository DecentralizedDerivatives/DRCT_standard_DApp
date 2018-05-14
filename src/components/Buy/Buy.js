import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, {DialogContent} from 'material-ui/Dialog';
import styles from './styles';
import Dropdown from '../Dropdown';
import {Factory, token, web3, Exchange} from '../../ethereum';

class Buy extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  state = {
    open: false,
    selectedToken: '',
    loading: false,
    disabled: false,
    created: false,
    orderID: ''
  };


  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };


  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getOrderDetails = async () =>{
    const exchange= await Exchange.deployed();
    const factory = await Factory.deployed();
    const accounts = await web3.eth.getAccounts();
    let books = await exchange.userOrders.call(accounts[0]);

    // get orders for that book:
    let o_row = [];
    let _allrows = []

    let order;
    console.log('oID',this.props.orderID)
    var j = this.props.orderID;
          order = await exchange.getOrder(j);
          console.log('o3',order[3])
          var _date = await factory.token_dates.call(order[3]);
          console.log(_date);
          _date = new Date(_date * 1000);
          _date = (_date.getMonth()+1) + '/' + _date.getDate() + '/' + _date.getFullYear() 
          o_row = j + '('+order[3],order[1].c[0].toString() + '/'+order[2].c[0].toString() + '/'+_date.toString() + ')';
          _allrows.push(o_row);
          this.setState({myOrders: _allrows});
                    if(_allrows.length == 1){
                        this.setState({selectedToken: order[3]});
                    }
  }



  buyOrder= async () => {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();

    let response, error,_value;
    try {
      response = await exchange.buy(this.props.orderID, {
        from: accounts[0],
        gas: 4000000,
        value: _value,
      });
    } catch (err) {
      error = err;
    }
    if (error) {
      // Add error handling
      this.setState({txId: error.tx, error: true, disabled: false});
      return;
    }

    {this.props.toggle}
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
              <Typography className={classes.title}>
                Order Confirmation
              </Typography>
            </div>

            <div className={classes.inputContainer}>
              <TextField
                id="amount"
                value={this.props.orderID}
                type="text"
                className={classes.fullWidth}
                helperText="Please verify the correct Order Id"
              />
            </div>

            <Button
              className={
                this.state.disabled ? classes.buttonDisabled : classes.button
              }
              disabled={this.state.disabled}
              onClick={this.buyOrder}
            >
              <Typography className={classes.buttonText}>Submit</Typography>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Buy.propTypes = {
  orderID: PropTypes.string.isRequired,
};



export default withStyles(styles)(Buy);
