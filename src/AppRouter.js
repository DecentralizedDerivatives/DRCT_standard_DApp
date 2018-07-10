import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
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
  componentDidMount() {
    this.props.checkUserConnection();
  }

  componentWillUpdate() {
    this.props.checkUserConnection();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header connected={this.props.metamask && this.props.network === 4} />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/portfolio" component={MyPortfolio} />
            <Route path="/bulletin" component={Bulletin} />
            <Route path="/how-to" component={HowTo} />
          </Switch>

          <BlockProgress />
          <ConnectionModal />
        </div>
      </Router>
    );
  }
}

AppRouter.propTypes = {
  checkUserConnection: PropTypes.func.isRequired,
  metamask: PropTypes.bool.isRequired,
  network: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  metamask: state.status.connectStatus.metamask,
  network: state.status.connectStatus.network
});

export default connect(
  mapStateToProps,
  { checkUserConnection }
)(AppRouter);
