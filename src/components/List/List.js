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
import {Factory, token, web3, Exchange} from '../../ethereum';

class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  static myTokens = ['BTC/USD', 'ETH/USD'];

  state = {
    open: false,
    selectedToken: '',
    amount: 0.1,
    selectedDate: new Date(),
    loading: false,
    disabled: false,
    created: false,
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  listOrder= async () => {
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
              <Typography className={classes.title}>Place Order</Typography>
                <Grid item>
                  <Dropdown
                    menuItems={List.myTokens}
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
                id="amount"
                value={Number(this.state.amount)}
                type="number"
                onChange={this.handleTextfieldChange('amount')}
                className={classes.fullWidth}
                helperText="Enter the price in Ether (e.g. 0.1)"
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
