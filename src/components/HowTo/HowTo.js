import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';

class HowTo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      open: false,
      duration: '',
      multiplier: 0,
      oracleAddress: '',
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
              <Typography className={classes.maintitle}>How to</Typography>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>View My Positions</Typography>
              <p>
                Please contact us at info@decentralizedderivatives.org to become a member.
              </p>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Obtaining a Positions</Typography>
              <p>
                The fastest way to get a position is to buy one on the Bulletin.
              </p>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>View My Positions</Typography>
              <p>
                Click on the Logo or on the 'My Portfolio' tabs.
              </p>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Place an Order</Typography>
              <p>
                Click 'List Order'.
                Select which of your positions you will be selling.
                Select the amount and price (in ETH).
                Click Submit.
              </p>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Fill an Order</Typography>
              <p>
                Open the 'Bulletin' tab, note an orderID and click Buy Order.  Enter the Order ID and click 'Submit'.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(HowTo);
