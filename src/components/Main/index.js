import React from 'react';
import {Switch, Route} from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import styles from './styles';
import Header from '../Header';
import MyPortfolio from '../MyPortfolio';
import Bulletin from '../Bulletin';
import CashOut from '../CashOut';
import withRoot from '../../utils/withRoot';
import HowTo from '../HowTo';

const Main = props => (
  <div className="main">
    <Header />
    <Switch>
      <Route path="/portfolio" component={MyPortfolio} />
      <Route path="/bulletin" component={Bulletin} />
      <Route path="/how_to" component={HowTo} />
       <Route component={ MyPortfolio } />
    </Switch>
  </div>
);

export default withRoot(withStyles(styles)(Main));
