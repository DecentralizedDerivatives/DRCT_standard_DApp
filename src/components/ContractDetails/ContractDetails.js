import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';

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

    return typeof this.props.tokenAddress !== "undefined" && this.props.tokenAddress.length?
    (
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
              <Typography className={classes.title}>Address: <a href={`https://rinkeby.etherscan.io/address/${this.props.contractAddress}`} target="_blank" >{this.props.contractAddress}</a></Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Duration: {this.props.contractDuration}</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Multiplier: {this.props.contractMultiplier}</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Oracle Address: <a href={`https://rinkeby.etherscan.io/address/${this.props.oracleAddress}`} target="_blank" >{this.props.oracleAddress}</a></Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Token Address:  <a href={`https://rinkeby.etherscan.io/address/${this.props.tokenAddress}`} target="_blank" >{this.props.tokenAddress}</a></Typography>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
    :( 
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
              <Typography className={classes.title}>Address: <a href={`https://rinkeby.etherscan.io/address/${this.props.contractAddress}`} target="_blank" >{this.props.contractAddress}</a></Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Duration: {this.props.contractDuration}</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Multiplier: {this.props.contractMultiplier}</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Oracle Address: <a href={`https://rinkeby.etherscan.io/address/${this.props.oracleAddress}`} target="_blank" >{this.props.oracleAddress}</a></Typography>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ContractDetails);
