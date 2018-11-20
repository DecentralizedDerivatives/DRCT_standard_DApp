import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FactoryProvider from '../factoryProvider';

class Landing extends Component {
  componentDidUpdate() {
    this.renderMessage();
  }

  renderMessage() {
    const network_id = FactoryProvider.getNetworkId();
    const connected_network = this.props.network;
    const networks = require('../networkProvider');
    switch (true) {
      case this.props.metamask && connected_network !== network_id:
        return (
          <div>
            <p>You are Currently Connected To:</p>
            <p className={"landing-network-status " + networks[connected_network].className}>{networks[connected_network].title}</p>
            <p>Please Set MetaMask To:</p>
            <p className={"landing-network-status " + networks[network_id].className}>{networks[network_id].title}</p>
          </div>
        );
      default:
        return (
          <div>
          <div id="landing_login">
            <p id="landing_login_p">Log in using Metamask</p>
          </div>
            <div className="landing-network-status">
              Select :
              <p className={networks[network_id].className}>
                {networks[network_id].title}
              </p>
            </div>
            <p className="landing_p">New to Metamask? <a href="https://www.cryptocompare.com/wallets/guides/how-to-use-metamask/">&nbsp; Learn More</a></p>
          </div>
        );
    }
  }


  render() {
    let trustlink = 'https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url='
    return (
      <div id="back">
      <div id="landing_container"> 
      <div id="landing">
      <div id="landing_text">
        <p><b>Let's get started:</b></p>
        <p>
          {this.renderMessage()}
        </p>
        <p>To use the secure Trust Wallet browser,<br /><a href={trustlink + window.location.href}>click here</a></p>
        <img alt=''
          id="landing-logo"
          src={require("../imgs/logo.png")}
            alt="logo"
            height="80px"
        />
        </div>
      </div>
      </div>
      </div>
    );
  }
}

Landing.propTypes = {
  metamask: PropTypes.bool.isRequired,
  network: PropTypes.number.isRequired,
  whiteListed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  metamask: state.status.connectStatus.metamask,
  network: state.status.connectStatus.network,
  whiteListed: state.status.connectStatus.whiteListed
});

export default connect(mapStateToProps)(Landing);
