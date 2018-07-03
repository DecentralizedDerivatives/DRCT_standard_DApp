import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ConnectionModal from './components/ConnectionModal';
import BlockProgress from './components/BlockProgress';
import Header from './components/Header';
import Landing from './components/Landing';
import MyPortfolio from './components/MyPortfolio';
import Bulletin from './components/Bulletin';
import CashOut from './components/CashOut';
import HowTo from './components/HowTo';
import { web3 } from '../ethereum';
import { checkUserConnection } from '../actions/statusActions';
import '../styles/AppRouter.css';

class AppRouter extends Component {
  async componentDidMount() {
    await this.props.checkUserConnection();
  }

  render() {
    return (
      <div className="app">
        <Header connected={this.state.connected} />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route path="/portfolio" component={MyPortfolio} />
          <Route path="/bulletin" component={Bulletin} />
          <Route path="/how-to" component={HowTo} />
          <Redirect to="/" />
        </Switch>

        <BlockProgress />
        <ConnectionModal />
      </div>
    );
  }
}

export default connect(
  null,
  { checkUserConnection }
)(AppRouter);
