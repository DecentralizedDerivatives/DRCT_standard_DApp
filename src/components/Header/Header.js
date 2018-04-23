import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Lens from '@material-ui/icons/Lens';
import styles from "./styles";
import CreateContract from '../CreateContract';

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    previousActive: '',
    active: '',
    open: false,
  }

  onClick = (link) => {
    if (link === 'Create Contract') {
      this.openCreateContract();
    }

    this.setState({ active: link })
  }

  openCreateContract = () => {
    this.setState({ open: true, previousActive: this.state.active });
  }

  closeCreateContract = () => {
    this.setState({ 
      open: false, 
      active: this.state.previousActive,
    });
  }

  renderHeaderLinks = () => {
    const { classes } = this.props;

    return ['My Portfolio', 'Exchange', 'Create Contract', 'Cash Out'].map(link => {
      return (
      <Grid className={classes.gridItem}key={link} item>
        <Button 
          className={this.state.active === link ? classes.buttonActive : classes.button}
          onClick={() => this.onClick(link)}
        >
          <Typography key={link} className={this.state.active === link ? classes.linkActive : classes.link}>
            {link}
          </Typography>
        </Button>
      </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.appBar}>
        <Grid container className={classes.container} direction='row' alignItems='stretch' justify='space-between'>

          <Grid item>
            <Grid container className={classes.container} alignItems='stretch' direction='row'>
              <Grid className={classes.logo} item>
              </Grid>
              {this.renderHeaderLinks()}
            </Grid>
          </Grid>

          <Grid item>
            {/* Need to make dynamic / Add errors */}
            <Grid container className={classes.connectedContainer} direction='row' alignItems='center'>
              <Grid item>
                <Typography className={classes.connected}>
                  Connected
                </Typography>
              </Grid>

               <Grid item>
                <Lens className={classes.lens} />
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        <CreateContract open={this.state.open} toggle={this.closeCreateContract} />
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
