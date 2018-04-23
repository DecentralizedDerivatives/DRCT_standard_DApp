import React, { Component } from 'react';
import Header from '../Header';
import withRoot from '../../utils/withRoot';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Header />
      </div>
    );
  }
}

export default withRoot(Main);
