import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import withStyles from 'material-ui/styles/withStyles';
import {Link} from 'react-router-dom';
import styles from './styles';

const ErrorModal = ({open, onClick, content, title, buttonText, classes}) => (
  <Dialog
    open={open}
    onClose={onClick}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" autoFocus onClick={onClick}>
        <Link className={classes.link} to="/">
          Homepage
        </Link>
      </Button>
      <Button color="primary" autoFocus>
        <a className={classes.link} href="https://metamask.io/" target="_blank">
          Get Metamask
        </a>
      </Button>
    </DialogActions>
  </Dialog>
);

ErrorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorModal);
