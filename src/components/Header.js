import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import '../styles/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
              src="../imgs/dda-logo.png"
              alt="logo"
              height="25px"
              width="25px"
            />DRCT
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/portfolio/">Portfolio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/how-to/">How To</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
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
              </UncontrolledDropdown>
              <NavItem>
                <span>
                  Connected
                  <i
                    className={classnames('far fa-circle', {
                      'connect__icon--green': this.props.connected,
                      'connect__icon--red': !this.props.connected
                    })}
                  />
                </span>
                />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  connected: PropTypes.bool.isRequired
};

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  color: PropTypes.string,
  expand: PropTypes.string
};

export default Header;
