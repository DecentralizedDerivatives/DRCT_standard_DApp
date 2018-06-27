import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ErrorModal from './components/ErrorModal';
import Header from './components/Header';
import Landing from './components/Landing';
import MyPortfolio from './components/MyPortfolio';
import Bulletin from './components/Bulletin';
import CashOut from './components/CashOut';
import HowTo from './components/HowTo';
import { web3 } from '../ethereum';
import '../styles/main.css';

class AppRouter extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      accounts: [],
      network: '',
      connected: true
    };
  }
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();
    if (!accounts.length || network !== 4) {
      this.setState({ modal: true, connected: false, accounts, network });
    } else {
      this.setState({ accounts, network });
    }
  }
  onModalPress = () => this.setState({ modal: !this.state.modal });

  // Convert to middleware
  isWeb3Active = component => {
    const { accounts, network } = this.state;
    if (network !== 4 || !accounts.length) {
      return null;
    }
    return component;
  };

  render() {
    return (
      <div className="app">
        <Header connected={this.state.connected} />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route path="/portfolio" component={this.isWeb3Active(MyPortfolio)} />
          <Route path="/bulletin" component={this.isWeb3Active(Bulletin)} />
          <Route path="/how-to" component={HowTo} />
          <Redirect to="/" />
        </Switch>

        <ErrorModal open={this.state.modal} onClick={this.onModalPress} />
      </div>
    );
  }
}

export default AppRouter;
