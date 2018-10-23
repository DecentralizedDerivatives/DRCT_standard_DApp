import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Dropdown disabled pending separate routes for dropdown items

// Use named export for unconnected component for testing
export class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMobileNav: false
    }
  }
  handleNavClick = (e) => {
    this.setState({showMobileNav: false});
  }
  handleTermsClick = (e) => {
    e.preventDefault();
    this.handleNavClick(e);
    if (this.props.showTerms) { this.props.showTerms(); }
  }
  hamburgerClick = (e) =>{
    this.setState({showMobileNav: !this.state.showMobileNav});
  }
  render() {
    return (
      <nav id="header-nav">
        <div onClick={this.hamburgerClick} className={'hamburger-btn ' + (this.state.showMobileNav ? 'hamburger-btn-x' : '')}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link onClick={this.handleNavClick} to="/">
          <img
            className="nav-logo"
            src="./dda-logo.png"
            alt="logo"
            height="30px"
            width="30px"
          />
        </Link>
        <ul id='mobile-nav' className={this.state.showMobileNav ? 'show-nav' : 'hide-nav'}>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link"} to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link"} to="/bulletin">Bulletin</Link>
          </li>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link"} to="/how-to">How To</Link>
          </li>
          <li>
            <p onClick={this.handleTermsClick} className="nav-link">Terms</p>
          </li>
        </ul>
        <div className="connection-status">
          {this.props.isConnected && this.props.whiteListed && (
            <div className="connected">
              Connected
                    <span style={{ color: 'green', paddingLeft: '5px' }}>
                <i className="fas fa-circle" />
              </span>
            </div>
          )}

          {this.props.isConnected && !this.props.whiteListed && (
            <div className="connected">
              Connected
                    <span style={{ color: 'yellow', paddingLeft: '5px' }}>
                <i className="fas fa-circle" />
              </span>
            </div>
          )}

          {!this.props.isConnected && (
            <div className="connected">
              Not Connected
                    <span style={{ color: 'red', paddingLeft: '5px' }}>
                <i className="fas fa-circle" />
              </span>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  showTerms: PropTypes.func,
  isConnected: PropTypes.bool.isRequired,
  whiteListed: PropTypes.bool.isRequired
};

export default Header;
