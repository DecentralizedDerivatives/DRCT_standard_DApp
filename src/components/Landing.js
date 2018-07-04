import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import '../styles/Landing.css';

class Landing extends Component {
  componentDidMount() {
    if (this.props.isConnectedMetamask && this.props.isConnectedNetwork) {
      this.props.history.push('/portfolio');
    }
  }

  render() {
    return (
      <div className="landing__bg">
        <div className="landing__overlay text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">DRCT DApp</h1>
                <p className="lead">
                  Please log into your MetaMask extension to access this site.
                </p>
                <hr />
                <a
                  className="btn btn-lg btn-light"
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Need MetaMask?
                </a>

                <a
                  href="http://wwww.ddacoop.org"
                  className="btn btn-lg btn-info mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More About DRCT DApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  isConnectedMetamask: PropTypes.bool.isRequired,
  isConnectedNetwork: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isConnectedMetamask: state.status.isConnectedMetamask,
  isConnectedNetwork: state.status.isConnectedNetwork
});

export default connect(mapStateToProps)(Landing);
