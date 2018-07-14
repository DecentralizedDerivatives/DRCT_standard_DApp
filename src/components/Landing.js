import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Landing extends Component {
  componentDidUpdate() {
    this.renderMessage();
  }

  renderMessage() {
    const network_id = 4; //ID of metamask network to connect to
    const connected_network = this.props.network;
    const network_labels = {
      1:{
        title:"main ethereum network",
        className:"ethereum-network-label"
      },
      3:{
        title:"ropsten test network",
        className:"ropsten-network-label"
      },
      4:{
        title:"rinkeby test network",
        className:"rinkeby-network-label"
      },
      42:{
        title:"kovan test network",
        className:"kovan-network-label"
      }
    }
    switch (true) {
      case this.props.metamask && connected_network !== network_id:
        return (
          <div>
            <p>You are Currently Connected To:</p>
            <p className={"landing-network-status " + network_labels[connected_network].className}>{network_labels[connected_network].title}</p>
            <p>Please Set MetaMask To:</p>
            <p className={"landing-network-status " + network_labels[network_id].className}>{network_labels[network_id].title}</p>
          </div>
        );
      case this.props.metamask && connected_network === network_id:
        return (
          <div>
            <p>You are Connected To:</p>
            <p className={"landing-network-status " + network_labels[network_id].className}>{network_labels[network_id].title}</p>
          </div>
        );
      default:
        return (
          <div>
            <p>Please Login to MetaMask</p>
            <div className="landing-network-status">
              Select :
              <p className={network_labels[network_id].className}>
                {network_labels[network_id].title}
              </p>
            </div>
          </div>
        );
    }
  }


  render() {
    return (
      <div id="landing">
        <h1 className="landing-head">
          Decentralized Derivatives Association  DRCT
        </h1>
        <h3 className="landing-subhead">
          {this.renderMessage()}
        </h3>
        <img alt=''
          className="landing-logo"
          src={require("../imgs/logo-large.png")}
        />
      </div>
    );
  }
}

Landing.propTypes = {
  metamask: PropTypes.bool.isRequired,
  network: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  metamask: state.status.connectStatus.metamask,
  network: state.status.connectStatus.network
});

export default connect(mapStateToProps)(Landing);
