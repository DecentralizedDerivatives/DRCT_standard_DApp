import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import styles from './styles';
import './navDrawerStyles.css';

class NavDrawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawer: PropTypes.func.isRequired
  };

  renderNavLinks = () => {
    const { classes } = this.props;
    const urls = [
      'portfolio',
      'bulletin',
      'create_contract',
      'cash_out',
      'how_to'
    ];
    return [
      'My Portfolio',
      'Bulletin',
      'Create Contract',
      'Cash Out',
      'How To'
    ].map((link, i) => {
      if (i === 2 || i === 3) {
        return (
          <ListItem
            button
            key={link}
            onClick={() => this.props.onClick(urls[i])}
          >
            <div className="drawer-link">
              <ListItemText primary={link} />
            </div>
          </ListItem>
        );
      }

      return (
        <Link className="drawer-link" to={`/${urls[i]}`} key={link}>
          <ListItem button>
            <ListItemText primary={link} />
          </ListItem>
        </Link>
      );
    });
  };

  render() {
    const { classes, handleDrawer, open } = this.props;

    return (
      <Drawer
        variant="persistent"
        anchor={'left'}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <button
            className="drawer-button"
            aria-label="Close Menu"
            onClick={handleDrawer}
          >
            <i className="material-icons drawer-icon">chevron_left</i>
          </button>
        </div>
        <hr className="divider" />
        <List>{this.renderNavLinks()}</List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(NavDrawer);
