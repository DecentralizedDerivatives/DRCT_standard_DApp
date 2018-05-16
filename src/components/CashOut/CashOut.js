import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {DialogContent} from 'material-ui/Dialog';
import styles from './styles';
import {Wrapped, web3} from '../../ethereum';

class CashOut extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  state = {
    open: false,
    duration: '',
    currency: '',
    amount: 0.1,
    selectedDate: new Date(),
    loading: false,
    disabled: false,
    created: false,
    myBalance:"0"
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleDateChange = date => {
    this.setState({selectedDate: date});
  };

  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillMount() {
    this.getMyBalance().then((result)=>{
      console.log('res',result);
    });
  }

  getMyBalance= async () =>{
    const wrapped = await Wrapped.deployed();
    const accounts = await web3.eth.getAccounts();
    var _res = await wrapped.balanceOf(accounts[0]);
    return _res.c[0];
  }

  cashOut= async () => {
    const wrapped = await Wrapped.deployed();
    const accounts = await web3.eth.getAccounts();
    let response, error;
    try {
      await wrapped.withdraw(this.state.myBalance,{
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
              <Typography className={classes.title}>Cash Out</Typography>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Amount to withdraw: {this.state.myBalance}</Typography>
            </div>


            <Button
              className={classes.button}
              onClick={this.cashOut}
            >
              <Typography className={classes.buttonText}>Submit</Typography>
            </Button>
            </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CashOut);
