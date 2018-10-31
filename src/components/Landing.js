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
      case this.props.metamask && connected_network === network_id:
        return (
          <div>
            <p>You are Connected To:</p>
            <p className={"landing-network-status " + networks[network_id].className}>{networks[network_id].title}</p>
            {this.props.whiteListed ? '' :
              <div>
                <p>The DDA dapp is currently for members only.</p>
                <p>To learn more about membership, visit: <br /><a href='http://www.ddacoop.org/membership'>http://www.ddacoop.org/membership</a></p>
                <p>To become a member, please visit<br /><a href='https://membership.ddacoop.org'>https://membership.ddacoop.org</a></p>
              </div>
            }
          </div>
        );
      default:
        return (
          <div>
            <p>Please Login to <a href="https://metamask.io/">MetaMask</a></p>
            <p className="landing_p"><a href="https://www.cryptocompare.com/wallets/guides/how-to-use-metamask/">What is MetaMask?</a></p>
            <div className="landing-network-status">
              Select :
              <p className={networks[network_id].className}>
                {networks[network_id].title}
              </p>
            </div>
          </div>
        );
    }
  }


  render() {
    let trustlink = 'https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url='
    return (
      <div id="landing">
        <h1 className="landing-head">
          Decentralized Derivatives Association  DRCT
        </h1>
        <h3 className="landing-subhead">
          {this.renderMessage()}
        </h3>
        <p>To use the secure Trust Wallet browser,<br />click <a href={trustlink + window.location.href}>here</a></p>
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
  network: PropTypes.number.isRequired,
  whiteListed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  metamask: state.status.connectStatus.metamask,
  network: state.status.connectStatus.network,
  whiteListed: state.status.connectStatus.whiteListed
});

export default connect(mapStateToProps)(Landing);
