import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-dates/initialize';

import ConnectionModal from './components/ConnectionModal';
import BlockProgress from './components/BlockProgress';
import Header from './components/Header';
import Landing from './components/Landing';
import MyPortfolio from './components/MyPortfolio';
import Bulletin from './components/Bulletin';
import HowTo from './components/HowTo';
import Terms from './components/Terms';
import { checkUserConnection } from './actions/statusActions';
import './style.css';

class AppRouter extends Component {
  constructor() {
    super();
    this.state = { showTerms: false };
  }
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
          <Header
            showTerms={() => { this.setState({showTerms: Boolean(true)}); }}
            isConnected={this.props.metamask && this.props.network === require('./config/keys').network_id}
            whiteListed={this.props.whiteListed}
          />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/portfolio" component={MyPortfolio} />
            <Route path="/bulletin" component={Bulletin} />
            <Route path="/how-to" component={HowTo} />
          </Switch>

          <BlockProgress />
          <ConnectionModal />
          { this.state.showTerms ?
            (
              <Terms close={() => { this.setState({showTerms: Boolean(false)}); }} />
            ) : ''}
        </div>
      </Router>
    );
  }
}

AppRouter.propTypes = {
  checkUserConnection: PropTypes.func.isRequired,
  metamask: PropTypes.bool.isRequired,
  whiteListed: PropTypes.bool.isRequired,
  network: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  metamask: state.status.connectStatus.metamask,
  network: state.status.connectStatus.network,
  whiteListed: state.status.connectStatus.whiteListed
});

export default connect(
  mapStateToProps,
  { checkUserConnection }
)(AppRouter);
