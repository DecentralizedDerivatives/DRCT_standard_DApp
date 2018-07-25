import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Dropdown disabled pending separate routes for dropdown items

// Use named export for unconnected component for testing
export class Header extends Component {
  handleNavClick = (e) => {
    if(this.props.isConnected){
      const path = e.currentTarget.getAttribute("href");
      if(document.getElementById("selected-nav")!==null) document.getElementById("selected-nav").removeAttribute("id");
      if(path !== "/"){
        e.currentTarget.setAttribute("id","selected-nav");
      }
    }
  }
  handleTermsClick = (e) => {
    e.preventDefault();
    this.props.showTerms();
  }
  render() {
    const disabledLink = this.props.isConnected?"":"disabled";
    return (
      <nav id="header-nav">
        <Link onClick={this.handleNavClick} to="/">
          <img
            className="nav-logo"
            src="./dda-logo.png"
            alt="logo"
            height="30px"
            width="30px"
          />
        </Link>
        <ul>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link " + disabledLink }  to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link " + disabledLink } to="/bulletin">Bulletin</Link>
          </li>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link " + disabledLink } to="/how-to">How To</Link>
          </li>
          <li>
            <a onClick={this.handleTermsClick} className="nav-link">Terms</a>
          </li>
        </ul>
        <div className="connection-status">
          {this.props.isConnected && (
            <div className="connected">
              Connected
                    <span style={{ color: 'green', paddingLeft: '5px' }}>
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
  showTerms: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired
};

export default Header;
