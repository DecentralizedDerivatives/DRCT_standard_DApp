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
      duration: '',
      multiplier:0,
      oracleAddress:'',
      currency: '',
      amount: 0.1,
      selectedDate: new Date(),
    };
  }

  static durations = ['One weeks', 'Two weeks'];
  static currency = ['BTC/USD', 'ETH/USD'];

  componentDidMount() {
    this.getDetails();
  }


  getDetails = async () => {
    const factory = await Factory.deployed();
    let response, error;
    try {
      response = await factory.getVariables();
    } catch (err) {
      error = err;
    }

    this.setState({ loading: false });

    if (error) {
      console.log(error);
      return;
    }

    this.setState({
      duration: response[0],
      multiplier: response[1],
      oracleAddress: response[2],
    });
  };

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

              <TextField
                helperText="Address: "
              />
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Duration: {this.state.duration}</Typography>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Multiplier: {this.state.multiplier}</Typography>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Oracle: {this.state.currency}</Typography>

              <TextField
                helperText="Oracle Address: "
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ContractDetails);