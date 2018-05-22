import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import styles from './styles';
import ErrorModal from '../ErrorModal';
import Header from '../Header';
import MyPortfolio from '../MyPortfolio';
import Bulletin from '../Bulletin';
import CashOut from '../CashOut';
import withRoot from '../../utils/withRoot';
import HowTo from '../HowTo';
import { web3 } from '../../ethereum';
import Sample from '../Sample';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      accounts: [],
      network: '',
      connected: true,
    };
  }
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();
    if (!accounts.length || network !== 3) {
      this.setState({ modal: true, connected: false });
    }
    this.setState({ accounts, network });
  }
  onModalPress = () => this.setState({ modal: !this.state.modal });
  isWeb3Active = component => {
    const { accounts, network } = this.state;
    if (network !== 3 || !accounts.length) {
      return null;
    }
    return component;
  };
  render() {
    return (
      <div className="main">
        <Header connected={this.state.connected} />
        <Switch>
          <Route path="/portfolio" component={this.isWeb3Active(MyPortfolio)} />
          <Route path="/bulletin" component={this.isWeb3Active(Bulletin)} />
          <Redirect to="/portfolio" />
        </Switch>

        <ErrorModal
          open={this.state.modal}
          onClick={this.onModalPress}
          content={
            <span>
              Are you sure you're connected to the Ethereum Ropsten Testnet?
            </span>
          }
          title="Unable to detect network"
          buttonText="Go to Homepage"
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Main));
