import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/ErrorModal.css';

// Refactor as class component
class ErrorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ModalHeader id="alert-dialog-title">
          Unable to detect network
        </ModalHeader>
        <ModalBody>
          <div id="alert-dialog-description">
            <span>
              Are you sure you're connected to the Ethereum Rinkeby Testnet?
            </span>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="button" onClick={this.toggle}>
            <Link className="button-link" to="/">
              Homepage
            </Link>
          </button>
          <button className="button" onClick={this.toggle}>
            <a
              className="button-link"
              href="https://metamask.io/"
              target="_blank"
            >
              Get Metamask
            </a>
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
};

export default ErrorModal;
