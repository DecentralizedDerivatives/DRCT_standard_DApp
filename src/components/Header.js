import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Dropdown disabled pending separate routes for dropdown items

// Use named export for unconnected component for testing
export class Header extends Component {
  constructor() {
    super();
    this.state = {
      isMobile: false
    }
  }
  componentDidMount = () => {
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w <= 700 && this.state.isMobile === false) {
        this.setState({ isMobile: true });
      } else if (w > 700 && this.state.isMobile === true) {
        this.setState({ isMobile: false });
        document.getElementById("nav-links").classList.remove("hide-nav");
        document.getElementById("nav-links").classList.remove("show-nav");
      }
    });
    window.addEventListener("scroll", () => {
      if(this.state.isMobile && document.getElementById("nav-links").classList.contains("show-nav")){
        document.getElementsByClassName("hamburger-btn-x")[0].classList.remove("hamburger-btn-x");
        document.getElementById("nav-links").classList.add("hide-nav");
        document.getElementById("nav-links").classList.remove("show-nav");
      }
    });
    if(window.innerWidth<=700)this.setState({isMobile:true});
  }
  handleNavClick = (e) => {
    if (this.props.isConnected && this.props.whiteListed) {
      const path = e.currentTarget.getAttribute("href");
      if (document.getElementById("selected-nav") !== null) document.getElementById("selected-nav").removeAttribute("id");
      if (path !== "/") {
        e.currentTarget.setAttribute("id", "selected-nav");
      }
    } else {
      return false;
    }
  }
  handleTermsClick = (e) => {
    e.preventDefault();
    this.props.showTerms();
  }
  hamburgerClick = (e) =>{
    if(e.currentTarget.classList.contains("hamburger-btn-x")){
      e.currentTarget.classList.remove("hamburger-btn-x");
      document.getElementById("nav-links").classList.add("hide-nav");
      document.getElementById("nav-links").classList.remove("show-nav");
    }else{
      e.currentTarget.classList.add("hamburger-btn-x");
      document.getElementById("nav-links").classList.remove("hide-nav");
      document.getElementById("nav-links").classList.add("show-nav");
    }
  }
  renderHamburger = () => {
    return (
      this.state.isMobile ? (
        <div onClick={this.hamburgerClick} className="hamburger-btn">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : ""
    );
  }
  render() {
    const disabledLink = this.props.isConnected ? "" : "disabled";
    return (
      <nav id="header-nav">
        {this.renderHamburger()}
        <Link onClick={this.handleNavClick} to="/">
          <img
            className="nav-logo"
            src="./dda-logo.png"
            alt="logo"
            height="30px"
            width="30px"
          />
        </Link>
        <ul id="nav-links">
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link " + disabledLink} to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link " + disabledLink} to="/bulletin">Bulletin</Link>
          </li>
          <li>
            <Link onClick={this.handleNavClick} className={"nav-link " + disabledLink} to="/how-to">How To</Link>
          </li>
          <li>
            <a onClick={this.handleTermsClick} className="nav-link">Terms</a>
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
  showTerms: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  whiteListed: PropTypes.bool.isRequired
};

export default Header;
