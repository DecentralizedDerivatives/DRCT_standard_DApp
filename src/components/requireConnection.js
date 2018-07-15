import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount = () => {
      this.shouldNavigateAway();
    };

    componentDidUpdate = () => {
      this.shouldNavigateAway();
    };

    shouldNavigateAway = () => {
      if (
        !(this.props.metamask && this.props.network === 4) &&
        this.props.verified
      ) {
        this.props.history.push('/');
      }
    };

    // Pass down child component props - down break the chain!
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    metamask: state.status.connectStatus.metamask,
    network: state.status.connectStatus.network,
    verified: state.status.connectStatus.verified
  });

  return connect(mapStateToProps)(ComposedComponent);
};
