import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import styles from './styles';
import './headerStyles.css';
import CreateContract from '../CreateContract';
import CashOut from '../CashOut';
import HowTo from '../HowTo';
import NavDrawer from '../NavDrawer';

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    connected: PropTypes.bool.isRequired
  };
  constructor() {
    super();
    this.state = {
      previousActive: '',
      active: '',
      openCash: false,
      openCreate: false,
      openHow: false,
      connected: true,
      drawerOpen: false
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const url = nextProps.location.pathname.replace('/', '');

    return {
      ...prevState,
      ...nextProps,
      active: url
    };
  }

  onClick = link => {
    link = link.toLowerCase();
    if (link === 'create_contract') {
      this.openCreateContract();
    } else if (link === 'cash_out') {
      this.openCashOut();
    } else if (link === 'how_to') {
      this.openHowTo();
    }
    this.setState({ active: link });
  };

  openCreateContract = () => {
    this.setState({ openCreate: true, previousActive: this.state.active });
  };

  closeCreateContract = () => {
    this.setState({
      openCreate: false,
      active: this.state.previousActive
    });
  };

  openCashOut = () => {
    this.setState({ openCash: true, previousActive: this.state.active });
  };

  closeCashOut = () => {
    this.setState({
      openCash: false,
      active: this.state.previousActive
    });
  };

  openHowTo = () => {
    this.setState({ openHow: true, previousActive: this.state.active });
  };

  closeHowTo = () => {
    this.setState({
      openHow: false,
      active: this.state.previousActive
    });
  };

  toggleMetamaskModal = () => this.setState({ metamask: !this.state.metamask });

  renderHeaderLinks = () => {
    const { classes } = this.props;
    const urls = [
      'portfolio',
      'portfolio',
      'bulletin',
      'create_contract',
      'cash_out',
      'how_to'
    ];
    return [
      'Logo',
      'My Portfolio',
      'Bulletin',
      'Create Contract',
      'Cash Out',
      'How To'
    ].map((link, i) => {
      const component = (
        <Grid key={link} item>
          <button
            className={
              this.state.active === urls[i] ? 'button-active' : 'button'
            }
            onClick={() => this.onClick(urls[i])}
          >
            <span
              key={link}
              className={
                this.state.active === urls[i] ? 'link-text-active' : 'link-text'
              }
            >
              {link}
            </span>
          </button>
        </Grid>
      );

      if (i === 0) {
        return (
          <Link className="header-link" to={`/${urls[i]}`} key={link}>
            <div className="logo">
              <img
                src="dda-logo.png"
                width="70"
                alt="Logo"
                height="70"
                className="header-link"
                style={{ marginTop: '7%', marginRight: '20%' }}
              />
            </div>
          </Link>
        );
      }

      if (i === 0) {
        return (
          <Link className="header-link" to={`/${urls[i]}`} key={link}>
            <div className="logo">
              <img
                src="dda-logo.png"
                width="70"
                height="70"
                alt="Home"
                className="header-link"
                style={{ marginTop: '7%', marginRight: '20%' }}
              />
            </div>
          </Link>
        );
      }

      if (i !== 3) {
        return (
          <Link className="header-link" to={`/${urls[i]}`} key={link}>
            {component}
          </Link>
        );
      }

      return component;
    });
  };

  handleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBar} position="static">
        <Grid
          container
          className={classes.container}
          direction="row"
          alignItems="stretch"
          justify="space-between"
        >
          <Grid item>
            <Grid
              container
              className={classes.container}
              alignItems="stretch"
              direction="row"
            >
              <Grid className={classes.menuContainer} item>
                <button
                  className="menu-button"
                  aria-label="Menu"
                  onClick={this.handleDrawer}
                >
                  <i className="material-icons menu-icon">menu</i>
                </button>
              </Grid>
              {this.renderHeaderLinks()}
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              className={classes.connectedContainer}
              direction="row"
              alignItems="center"
            >
              <Grid item>
                <p className="connected">Connected</p>
              </Grid>

              <Grid item>
                <i
                  className={
                    this.state.connected
                      ? 'material-icons lens-icon lens-on'
                      : 'material-icons lens-icon lens-off'
                  }
                >
                  lens
                </i>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <NavDrawer
          open={this.state.drawerOpen}
          handleDrawer={this.handleDrawer}
          onClick={this.onClick}
        />

        <CreateContract
          open={this.state.openCreate}
          toggle={this.closeCreateContract}
        />
        <HowTo open={this.state.openHow} toggle={this.closeHowTo} />
        <CashOut open={this.state.openCash} toggle={this.closeCashOut} />
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(Header));
