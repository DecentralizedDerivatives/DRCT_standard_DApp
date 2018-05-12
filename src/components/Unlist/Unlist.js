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
import {Factory,Exchange, token, web3} from '../../ethereum';

class Unlist extends Component {
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

  buyOrder= async () => {
    const exchange = await Exchange.deployed();
    const accounts = await web3.eth.getAccounts();

    let response, error;

    try {
      response = await exchange.unlist(this.props.orderID, {
        from: accounts[0],
        gas: 4000000,
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
              <Typography className={classes.title}>Unlist Order</Typography>
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
              onClick={this.CashOut}
            >
              <Typography className={classes.buttonText}>
                Unlist Order
              </Typography>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Unlist);
