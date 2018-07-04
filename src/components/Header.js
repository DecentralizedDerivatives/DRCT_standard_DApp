import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
import '../styles/Header.css';

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
            <img src="./dda-logo.png" alt="logo" height="30px" width="30px" />
            {'  '}
            DRCT
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
                <span>
                  <span className="connected">Connected</span>
                  <i
                    className={classnames('far fa-circle', {
                      'connect__icon--green':
                        this.props.isConnectedMetamask &&
                        this.props.isConnectedNetwork,
                      'connect__icon--red':
                        !this.props.isConnectedMetamask ||
                        !this.props.isConnectedNetwork
                    })}
                  />
                </span>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  isConnectedMetamask: PropTypes.bool.isRequired,
  isConnectedNetwork: PropTypes.bool.isRequired
};

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  color: PropTypes.string,
  expand: PropTypes.string
};

const mapStateToProps = state => ({
  isConnectedMetamask: state.status.isConnectedMetamask,
  isConnectedNetwork: state.status.isConnectedNetwork
});

export default connect(mapStateToProps)(Header);
