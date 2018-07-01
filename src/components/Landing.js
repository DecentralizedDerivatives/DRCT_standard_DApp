import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Landing.css';

class Landing extends Component {
  componentDidMount() {
    if (this.props.connected) {
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
                  You must have the MetaMask extension installed to use this
                  application
                </p>
                <hr />
                <a
                  className="btn btn-lg btn-light"
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Metamask
                </a>

                <a
                  href="http://wwww.ddacoop.org"
                  className="btn btn-lg btn-info mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
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
  connected: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  connected: state.connected
});

export default connect(mapStateToProps)(Landing);
