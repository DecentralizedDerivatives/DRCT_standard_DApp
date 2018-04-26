import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import { DatePicker } from 'material-ui-pickers';
import styles from './styles';
import Dropdown from '../Dropdown';
import {factory, web3} from '../../ethereum';

class CreateContract extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  }

  static durations = ['One weeks', 'Two weeks']
  static currency = ['BTC/USD', 'ETH/USD']

  state = {
    open: false,
    duration: '',
    currency: '',
    amount: 0.1,
    selectedDate: new Date(),
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  handleTextfieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  createContract = async () => {
    const contract = await factory.deployed();
    const accounts = await web3.eth.getAccounts();

    var date = Number((new Date(this.state.selectedDate).getTime() / 1000).toFixed(0));

    date = date - date % 86400;

    const txId = await contract.deployContract(date,{from: accounts[0],gas:4000000});
    console.log(txId);
  }

  render() {
    const { classes } = this.props;

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
                Contract Type
              </Typography>
              <Grid container justify='space-between'>
                <Grid item>
                  <Dropdown 
                    menuItems={CreateContract.durations} 
                    value={this.state.duration} 
                    name='duration'
                    onChange={this.handleChange}
                    className={classes.duration}
                  />
                </Grid>
                <Grid item>
                  <Dropdown 
                    menuItems={CreateContract.currency} 
                    value={this.state.currency} 
                    name='currency' 
                    onChange={this.handleChange}
                    className={classes.currency}
                  />
                </Grid>
              </Grid>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>
                Start Date
              </Typography>

              <DatePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                animateYearScrolling={false}
                className={classes.fullWidth}
                format={'MMMM D YYYY'}
              />
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>
                Amount of Ether
              </Typography>

              <TextField
                id="amount"
                value={Number(this.state.amount)}
                type='number'
                onChange={this.handleTextfieldChange('amount')}
                className={classes.fullWidth}
                helperText='Must be at least 0.1'
              />
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>
                Premium
              </Typography>

              <TextField
                id="premium"
                value={this.state.premium}
                type='number'
                onChange={this.handleTextfieldChange('premium')}
                className={classes.fullWidth}
                helperText='Recommended 0.1'
              />
            </div>

            <Button className={classes.button} onClick={this.createContract}>
              <Typography className={classes.buttonText}>
                Create Contract
              </Typography>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CreateContract);
