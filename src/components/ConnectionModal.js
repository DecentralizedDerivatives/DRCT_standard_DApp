import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { showConnectionModal } from '../actions/statusActions';

// Refactor as class component
class ConnectionModal extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.showConnectionModal(false);
    // this.props.history.push('/');
  }

  render() {
    return (
      <Modal isOpen={this.props.isConnectModalOpen}>
        <ModalHeader id="alert-dialog-title">
          Unable to detect network
        </ModalHeader>
        <ModalBody>
          <div id="alert-dialog-description">
            <span>
              Are you sure you're connected to the Ethereum Main Network?
            </span>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={this.handleClick}>
            <Link className="button-link" to="/">
              Homepage
            </Link>
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ConnectionModal.propTypes = {
  showConnectionModal: PropTypes.func.isRequired,
  isConnectModalOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isConnectModalOpen: state.status.isConnectModalOpen
});

export default connect(
  mapStateToProps,
  { showConnectionModal }
)(ConnectionModal);
