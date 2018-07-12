import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Landing extends Component {
  componentDidUpdate() {
    this.renderMessage();
    this.renderButtons();
  }

  renderMessage() {
    let message;
    const network = 'Rinkeby Test Network';

    if (!this.props.metamask) {
      message = (
        <div>
          <p>Please Login to MetaMask</p>
          <p>Select: {network}</p>
        </div>
      );
    } else if (this.props.metamask && this.props.network !== 4) {
      message = (
        <div>
          <p>Please Set MetaMask To:</p>
          <p>{network}</p>
        </div>
      );
    } else if (this.props.metamask && this.props.network === 4) {
      message = (
        <div>
          <p>You are Connected To:</p>
          <p>
            <em>{network}</em>
          </p>
        </div>
      );
    }

    return <div className="lead">{message}</div>;
  }

  renderButtons() {
    let msgBtn = '';

    const ddacoopBtn = (
      <a
        href="http://wwww.ddacoop.org"
        className="btn btn-info ml-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More About DRCT DApp
      </a>
    );

    if (!this.props.metamask) {
      msgBtn = (
        <a
          className="btn btn-primary mr-2"
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Need MetaMask?
        </a>
      );
    } else if (this.props.metamask && this.props.network === 4) {
      msgBtn = (
        <Link to="/portfolio" className="btn btn-success link mr-2">
          Go to My Portfolio
        </Link>
      );
    }

    return (
      <div className="center-items">
        {msgBtn} {ddacoopBtn}
      </div>
    );
  }

  render() {
    return (
      <div className="landing__bg">
        <div className="landing__overlay text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">DRCT DApp</h1>
                {this.renderMessage()}
                <hr />
                {this.renderButtons()}
              </div>
            </div>
          </div>
        </div>
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
