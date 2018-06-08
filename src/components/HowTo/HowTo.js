import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';

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
      <div className={classes.root}>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggle}
                    title="How to Page"
          modal={false}
          autoScrollBodyContent={true}
        >
          <DialogContent className={classes.dialogContent}>

            <div className={classes.inputContainer}>
              <Typography className={classes.maintitle}>How to</Typography>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Welcome to the DDA dapp!</Typography>
              <Typography className={classes.title}>Before we get into specifics, let's talk about how the contracts work.</Typography>
              <List className={classes.list}>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>All contracts are Ethereum smart contracts that pay out the change in an underlying rate (e.g. BTC/USD) over a time frame (e.g. 7 days)  </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Sometimes the contracts use multipliers too (e.g. 10x)  </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>All Contracts are fully collateralized (the smart contract holds the Ether and the contracts are capped (so a 10x multiplier means that a 10% move is all you can gain or lose from)) </Typography> </ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Contracts start by a market maker creating a contract by funding both sides (long and short) </Typography> </ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Contract positions are represented as tokens on the Ethereum network (e.g. one Ether of collateral locked in this contract is worth 1000 tokens. This is your balance) </Typography> </ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Owners of tokens at expiration get paid from collateral held in the smart contract  </Typography></ListItem>
              </List>
            </div>

                        <div className="logo">
                            <Typography className={classes.title}>Here's a picture to help explain it a bit better.</Typography>
              <img src="infograph-transparent.png" alt="Infograph" className={classes.link} style={{ width:"25em",marginTop: '7%', marginRight: '20%' }} />
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Viewing My Positions</Typography>
              <List className={classes.list}>
                <ListItem> 
                <Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                <Typography className={classes.title}>In the 'My Portfolio' tab, you can see your positions and your transactions </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Go buy some tokens or create a contract if you don't have any! </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>You can click on the row to see more details about the tokens </Typography></ListItem>
              </List>
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Creating a Contracts</Typography>
              <List className={classes.list}>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Creating a contract is a two step process </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>First you have to deploy a contract, then you have to wrap your Ether and send it to the contract to fund it </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>So in the 'Create Contract' tab, first pick a start date and then click: 'Create Contract' </Typography> </ListItem>
                  <ListItem> <Typography className={classes.title}>After that, you can wait for the address result (your new contract)  </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                <Typography className={classes.title}> Once that comes back, you can click 'Send Funds' to send double what you entered in the 'amount of Ether' field (its per side) </Typography></ListItem>
                  <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Once the contract mines you will see it in your positions  </Typography></ListItem>
              </List>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Using the Bulletin</Typography>
              <List className={classes.list}>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>The Bulletin is a sell only list of tokens that you can buy (think like Craigslist but for derivative tokens) </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>That said, there are no partial orders on the Bulletin (you have to buy them all in a given order) </Typography> </ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>To list your own, just click list, pick from your tokens, set an amount to sell and a price and your off </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>You own the tokens until someone buys them (they'll still show up in your token list) </Typography> </ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                <Typography className={classes.title}> To buy, just find the order ID and click buy. </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>You can unlist your orders also by just knowing the order ID </Typography> </ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                <Typography className={classes.title}> If you haven't realized by now, all tokens with the same details (underlying rate, duration , multiplier, and start date) are fungible, so feel free to buy from multiple different created contracts </Typography> </ListItem>
              </List>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>Cashing Out</Typography>
              <List className={classes.list}>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>Contracts for the dapp, although you send them Ether, actually use wrapped (or tokenized Ether) to make things easier on us </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>This however means that you'll have 'unwrap' your Ether after the contract expires and pays out </Typography></ListItem>
                 <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>To do this, just click 'Cash Out </Typography>'</ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                <Typography className={classes.title}> If you have a balance there, it means that you can click withdraw and unwrap all your Ether </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                <Typography className={classes.title}> Remember that some contracts may take a day to close out, so don't panic if your Eth isn't there on the expiration date  </Typography></ListItem>
             </List>
            </div>
            <div className={classes.inputContainer}>
              <Typography className={classes.title}>More Information</Typography>
              <List className={classes.list}>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                <Typography className={classes.title}> Have another question, shoot us an email at: <a href="mailto:info@decentralizedderivatives.org">info@decentralizedderivatives</a> </Typography></ListItem>
                <ListItem><Avatar style={{padding:5,height:20, width:20}} alt="EThLogo" src="eth_transparent.png" />
                 <Typography className={classes.title}>To become a member or read more about us, check out our website: <a href="https://www.ddacoop.org">www.ddacoop.org</a></Typography></ListItem>
              </List>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(HowTo);