import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';
import Dropdown from '../Dropdown';
import { Factory } from '../../ethereum';

class ContractDetails extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };
  constructor(){
    super();
    this.state = {
      open: false,
      currency: '',
      amount: 0.1,
      selectedDate: new Date(),
    };
  }

  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

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
              <Typography className={classes.title}>Factory Contract</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Address: {this.props.contractAddress}</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Duration: {this.props.contractDuration}</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Multiplier: {this.props.contractMultiplier}</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Oracle Address: {this.props.oracleAddress}</Typography>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ContractDetails);
