import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from './styles';

class NavDrawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawer: PropTypes.func.isRequired,
  };

  renderNavLinks = () => {
    const {classes} = this.props;
    const urls = [
      'portfolio',
      'bulletin',
      'create_contract',
      'cash_out',
      'how_to',
    ];
    return [
      'My Portfolio',
      'Bulletin',
      'Create Contract',
      'Cash Out',
      'How To',
    ].map((link, i) => {
      if (i === 2 || i === 3) {
        return (
          <ListItem
            button
            key={link}
            onClick={() => this.props.onClick(urls[i])}
          >
            <div className={classes.link}>
              <ListItemText primary={link} />
            </div>
          </ListItem>
        );
      }

      return (
        <Link className={classes.link} to={`/${urls[i]}`} key={link}>
          <ListItem button>
            <ListItemText primary={link} />
          </ListItem>
        </Link>
      );
    });
  };

  render() {
    const {classes, handleDrawer, open} = this.props;

    return (
      <Drawer
        variant="persistent"
        anchor={'left'}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawer}>{<ChevronLeftIcon />}</IconButton>
        </div>
        <Divider />
        <List>{this.renderNavLinks()}</List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(NavDrawer);
