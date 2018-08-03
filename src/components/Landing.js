import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Landing extends Component {
  componentDidUpdate() {
    this.renderMessage();
  }

  renderMessage() {
    const network_id = require('../config/keys').network_id;
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
              <p>The DDA dapp is currently for members only.<br /> If you are interested in becoming a member,<br />please visit: <a href='http://www.ddacoop.org/membership'>http://www.ddacoop.org/membership</a></p>
            }
          </div>
        );
      default:
        return (
          <div>
            <p>Please Login to MetaMask</p>
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
  network: PropTypes.number.isRequired,
  whiteListed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  metamask: state.status.connectStatus.metamask,
  network: state.status.connectStatus.network,
  whiteListed: state.status.connectStatus.whiteListed
});

export default connect(mapStateToProps)(Landing);
