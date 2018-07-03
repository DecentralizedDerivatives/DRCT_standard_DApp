import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  checkUserConnection,
  showConnectionModal
} from '../actions/statusActions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    static propTypes = {
      checkUserConnection: PropTypes.func.isRequired,
      showConnectionModal: PropTypes.func.isRequired,
      isConnectedMetamask: PropTypes.bool.isRequired,
      isConnectedNetwork: PropTypes.bool.isRequired
    };

    componentDidMount = async () => {
      await this.props.checkUserConnection();
      this.connectionStatusResponse();
    };

    componentDidUpdate = async () => {
      await this.props.checkUserConnection();
      this.connectionStatusResponse();
    };

    connectionStatusResponse = () => {
      // Push to home if Metamask not active
      if (!this.props.isConnectedMetamask) {
        this.props.history.push('/');
      }

      // Show connection modal if wrong network
      if (this.props.isConnectedMetamask && !this.props.isConnectedNetwork) {
        this.props.showConnectionModal(true);
      }
      // Close modal if connected
      if (this.props.isConnectedMetamask && !this.props.isConnectedNetwork) {
        this.props.showConnectionModal(false);
      }
    };
    // Pass down child component props - down break the chain!
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isConnectedMetamask: state.status.isConnectedMetamask,
    isConnectedNetwork: state.status.isConnectedNetwork
  });

  return connect(
    mapStateToProps,
    { checkUserConnection, showConnectionModal }
  )(ComposedComponent);
};
