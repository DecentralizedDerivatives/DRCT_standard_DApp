import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import styles from './styles';
import Header from '../Header';
import withRoot from '../../utils/withRoot';
import Sample from '../Sample';

const Main = (props) => 
  (<div className='main'>
    <Header />
    <Sample />
  </div>);

export default withRoot(withStyles(styles)(Main));
