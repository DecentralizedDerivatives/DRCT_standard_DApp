import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectionModal from './components/ConnectionModal';
import BlockProgress from './components/BlockProgress';
import Header from './components/Header';
import Landing from './components/Landing';
import MyPortfolio from './components/MyPortfolio';
import Bulletin from './components/Bulletin';
import HowTo from './components/HowTo';
import { checkUserConnection } from './actions/statusActions';

class AppRouter extends Component {
  async componentDidMount() {
    await this.props.checkUserConnection();
  }

  render() {
    return (
      <div className="app">
        <Header
          connected={
            this.props.isConnectedMetamask && this.props.isConnectedNetwork
          }
        />
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

AppRouter.propTypes = {
  isConnectedMetamask: PropTypes.bool.isRequired,
  isConnectedNetwork: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isConnectedMetamask: state.status.isConnectedMetamask,
  isConnectedNetwork: state.status.isConnectedNetwork
});

export default connect(
  mapStateToProps,
  { checkUserConnection }
)(AppRouter);
