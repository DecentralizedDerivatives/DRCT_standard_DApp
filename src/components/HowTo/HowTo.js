import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import styles from './styles';
import './howToStyles.css';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';

class HowTo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
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
      selectedDate: new Date()
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
            <div className="container">
              <p className="main-title">How to</p>
            </div>
            <div className="container">
              <p className="title">Welcome to the DDA dapp!</p>
              <p className="title">
                Before we get into specifics, let's talk about how the contracts
                work.
              </p>
              <List className={classes.list}>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    All contracts are Ethereum smart contracts that pay out the
                    change in an underlying rate (e.g. BTC/USD) over a time
                    frame (e.g. 7 days){' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Sometimes the contracts use multipliers too (e.g. 10x){' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    All Contracts are fully collateralized. The smart contract
                    holds the Ether and the contracts are capped (so a 10x
                    multiplier means that a 10% move is all you can gain or lose
                    from)
                  </p>{' '}
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Contracts start by a market maker creating a contract by
                    funding both sides (long and short){' '}
                  </p>{' '}
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Contract positions are represented as tokens on the Ethereum
                    network (e.g. one Ether of collateral locked in this
                    contract is worth 1000 tokens. This is your balance){' '}
                  </p>{' '}
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Owners of tokens at expiration get paid from collateral held
                    in the smart contract{' '}
                  </p>
                </ListItem>
              </List>
            </div>

            <div className="logo">
              <p className="title">
                Here's a picture to help explain it a bit better.
              </p>
              <img
                src="infograph-transparent.png"
                alt="Infograph"
                className={classes.link}
                style={{ width: '25em', marginTop: '7%', marginRight: '20%' }}
              />
            </div>

            <div className="container">
              <p className="title">Viewing My Positions</p>
              <List className={classes.list}>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    In the 'My Portfolio' tab, you can see your positions and
                    your transactions{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Go buy some tokens or create a contract if you don't have
                    any!{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    You can click on the row to see more details about the
                    tokens{' '}
                  </p>
                </ListItem>
              </List>
            </div>

            <div className="container">
              <p className="title">Creating a Contracts</p>
              <List className={classes.list}>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Creating a contract is a two step process{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    First you have to deploy a contract, then you have to wrap
                    your Ether and send it to the contract to fund it{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    So in the 'Create Contract' tab, first pick a start date and
                    then click: 'Create Contract'{' '}
                  </p>{' '}
                </ListItem>
                <ListItem>
                  {' '}
                  <p className="title">
                    After that, you can wait for the address result (your new
                    contract){' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    {' '}
                    Once that comes back, you can click 'Send Funds' to send
                    double what you entered in the 'amount of Ether' field (its
                    per side){' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Once the contract mines you will see it in your positions{' '}
                  </p>
                </ListItem>
              </List>
            </div>
            <div className="container">
              <p className="title">Using the Bulletin</p>
              <List className={classes.list}>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    The Bulletin is a sell only list of tokens that you can buy
                    (think like Craigslist but for derivative tokens){' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    That said, there are no partial orders on the Bulletin (you
                    have to buy them all in a given order){' '}
                  </p>{' '}
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    To list your own, just click list, pick from your tokens,
                    set an amount to sell and a price and your off{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    You own the tokens until someone buys them (they'll still
                    show up in your token list){' '}
                  </p>{' '}
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    {' '}
                    To buy, just find the order ID and click buy.{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    You can unlist your orders also by just knowing the order ID{' '}
                  </p>{' '}
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    {' '}
                    If you haven't realized by now, all tokens with the same
                    details (underlying rate, duration , multiplier, and start
                    date) are fungible, so feel free to buy from multiple
                    different created contracts{' '}
                  </p>{' '}
                </ListItem>
              </List>
            </div>
            <div className="container">
              <p className="title">Cashing Out</p>
              <List className={classes.list}>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    Contracts for the dapp, although you send them Ether,
                    actually use wrapped (or tokenized Ether) to make things
                    easier on us{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    This however means that you'll have to 'unwrap' your Ether
                    after the contract expires and pays out{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">To do this, just click 'Cash Out </p>'
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    {' '}
                    If you have a balance there, you will be able to click
                    withdraw and unwrap all your Ether{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    {' '}
                    Remember that some contracts may take a day to close out, so
                    don't panic if your Eth isn't there on the expiration date{' '}
                  </p>
                </ListItem>
              </List>
            </div>
            <div className="container">
              <p className="title">More Information</p>
              <List className={classes.list}>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    {' '}
                    Have another question, shoot us an email at:{' '}
                    <a href="mailto:info@decentralizedderivatives.org">
                      info@decentralizedderivatives
                    </a>{' '}
                  </p>
                </ListItem>
                <ListItem>
                  <Avatar
                    style={{ padding: 5, height: 20, width: 20 }}
                    alt="EThLogo"
                    src="eth_transparent.png"
                  />
                  <p className="title">
                    To become a member or read more about us, check out our
                    website:{' '}
                    <a href="https://www.ddacoop.org">www.ddacoop.org</a>
                  </p>
                </ListItem>
              </List>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(HowTo);
