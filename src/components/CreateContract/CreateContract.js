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
import {Factory, UserContract, web3} from '../../ethereum';

class CreateContract extends Component {
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
    contractAddress: '',
    txId: '',
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

  createContract = async () => {
    const factory = await Factory.deployed();
    const accounts = await web3.eth.getAccounts();

    let date = Number(
      (new Date(this.state.selectedDate).getTime() / 1000).toFixed(0)
    );

    date = date - date % 86400;

    let response, error;

    this.setState({loading: true, disabled: true, showAddress: true});

    try {
      response = await factory.deployContract(date, {
        from: accounts[0],
        gas: 4000000,
      });
    } catch (err) {
      error = err;
    }

    this.setState({loading: false});

    if (error) {
      // Add error handling
      this.setState({txId: error.tx, error: true, disabled: false});
      return;
    }

    this.setState({
      showSendFunds: true,
      txId: response.tx,
      contractAddress: response.logs[0].args._created,
    });
  };

  sendFunds = async () => {
    const userContract = await UserContract.deployed();
    const accounts = await web3.eth.getAccounts();
    console.log(this.state.contractAddress);
    console.log(accounts[0]);

    let _value = 1e18 * this.state.amount;
    console.log(this.state.contractAddress,_value,_value*2);
    let response, error;
    userContract.Initiate(this.state.contractAddress,_value,{
        from: accounts[0],
        gas: 4000000,
        value: _value*2
      }).then((res,err) =>{
        if(err){
          console.log('Error Message:', err);
        }
        else(console.log('Succesful Initiation of Contract!: ',res));
      })
    this.props.toggle
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
              <Typography className={classes.title}>Contract Type</Typography>
              <Grid container justify="space-between">
                <Grid item>
                  <Dropdown
                    menuItems={CreateContract.durations}
                    value={this.state.duration}
                    name="duration"
                    onChange={this.handleChange}
                    className={classes.duration}
                  />
                </Grid>
                <Grid item>
                  <Dropdown
                    menuItems={CreateContract.currency}
                    value={this.state.currency}
                    name="currency"
                    onChange={this.handleChange}
                    className={classes.currency}
                  />
                </Grid>
              </Grid>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Start Date</Typography>

              <DatePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                animateYearScrolling={false}
                className={classes.fullWidth}
                format={'MMMM D YYYY'}
              />
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Amount of Ether</Typography>

              <TextField
                id="amount"
                value={Number(this.state.amount)}
                type="number"
                onChange={this.handleTextfieldChange('amount')}
                className={classes.fullWidth}
                helperText="Must be at least 0.1"
              />
            </div>
            <Button
              className={
                this.state.disabled ? classes.buttonDisabled : classes.button
              }
              disabled={this.state.disabled}
              onClick={this.createContract}
            >
              <Typography className={classes.buttonText}>
                Create Contract
              </Typography>
            </Button>
          </DialogContent>

          {this.state.showAddress && <div className={classes.line} />}
          {this.state.showAddress && (
            <DialogContent className={classes.addressResultContainer}>
              <div className={classes.inputContainer}>
                <Grid
                  container
                  direction="row"
                  alignItems="stretch"
                  justify="space-between"
                >
                  <Grid item>
                    <Typography className={classes.title}>
                      Address Result
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

                {this.state.contractAddress && (
                  <Typography className={classes.contractAddress}>
                    {this.state.contractAddress}
                  </Typography>
                )}
              </div>
            </DialogContent>
          )}

          {this.state.showSendFunds && <div className={classes.line} />}
          {this.state.showSendFunds && (
            <DialogContent className={classes.sendFundsContainer}>
              <Button className={classes.button} onClick={this.sendFunds}>
                <Typography className={classes.buttonText}>
                  Send Funds
                </Typography>
              </Button>
            </DialogContent>
          )}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CreateContract);
