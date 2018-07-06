import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Landing extends Component {
  render() {
    return (
      <div className="landing__bg">
        <div className="landing__overlay text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">DRCT DApp</h1>
                {!this.props.metamask && (
                  <div>
                    <p className="lead">
                      Please log into your MetaMask extension to access this
                      site.
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
                  </div>
                )}

                {this.props.metamask &&
                  this.props.network !== 4 && (
                    <div>
                      <p className="lead">
                        Please make sure MetaMask is set to{' '}
                        <em>Rinkeby Test Network</em>
                      </p>
                    </div>
                  )}

                {this.props.metamask &&
                  this.props.network === 4 && (
                    <div>
                      <p className="lead">
                        You are connected to <em>Rinkeby Test Network</em>
                      </p>
                      <button>
                        <Link href="/portfolio/">Go to My Portfolio</Link>
                      </button>
                    </div>
                  )}

                <div>
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
