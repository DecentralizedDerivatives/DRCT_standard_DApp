import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from 'reactstrap';

// Dropdown disabled pending separate routes for dropdown items

// Use named export for unconnected component for testing
export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="bg-dark" dark expand="md">
          <NavbarBrand href="/">
            <img
              className="header__logo"
              src="./dda-logo.png"
              alt="logo"
              height="30px"
              width="30px"
            />
            DRCT
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/portfolio">Portfolio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/bulletin">Bulletin</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/how-to">How To</NavLink>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="/buy/">Buy</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/list/">List</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/unlist/">Unlist</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink href="/create-contract/">Create Contract</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <NavItem>
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
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  isConnected: PropTypes.bool.isRequired
};

Navbar.propTypes = {
  dark: PropTypes.bool,
  color: PropTypes.string,
  expand: PropTypes.string
};

export default Header;
