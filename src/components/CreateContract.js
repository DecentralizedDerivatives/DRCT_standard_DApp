import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Factory, UserContract, web3 } from '../ethereum';
import { Collapse } from 'reactstrap';
import TextField from './TextField';
import BlockProgress from './BlockProgress';
import CreateContractForm from './CreateContractForm';
import { getContractOpenDates } from '../actions/contractActions';
import {
  sendCreateContractOrder,
  sendSendFundsOrder
} from '../actions/orderActions';

// Use named export for unconnected component for testing
export class CreateContract extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      sendFundsOpen: false,
      resultsMessage: ''
    };
  }

  async componentWillMount() {
    await this.props.getContractOpenDates();
  }

  handleCreateClick = async e => {
    await this.props.sendCreateContractOrder(
      this.props.selectedContractDate,
      this.props.userAccount
    );

    if (this.props.newContractError) {
      this.setState({
        resultsMessage: `Error: ${this.props.newContractError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else {
      this.setState({
        resultsMessage: `Address result ${this.props.newContractAddress}`,
        sendFundsOpen: true,
        formOpen: false
      });
    }
  };

  handleSendFundsClick = async e => {
    const sendFundsDetails = {
      newContractAddress: this.props.newContractAddress,
      createContractAmount: this.props.createContractAmount
    };

    await this.props.sendSendFundsOrder(
      sendFundsDetails,
      this.props.userAccount
    );

    if (this.props.newContractFundsError) {
      this.setState({
        resultsMessage: `Error: ${this.props.newContractFundsError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else {
      this.setState({
        resultsMessage: `Contract successfully funded.`,
        sendFundsOpen: false,
        formOpen: false
      });
    }
  };

  toggleFormVisibility() {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }

  render() {
    return (
      <div className="container">
        <div id="create-contract-button">
          <button onClick={this.toggleFormVisibility}>Create Contract</button>
        </div>

        <Collapse isOpen={this.state.formOpen}>
          <div id="create-contract-form">
            <h4 className="center-text">Create Contract</h4>
            <CreateContractForm
              name="createContractForm"
              onSubmit={this.handleCreateClick}
            />
          </div>
        </Collapse>

        <Collapse isOpen={this.state.sendFundsOpen}>
          <div id="send-funds">
            <h4 className="center-text">Contract Created</h4>
            <button onClick={this.handleSendFundsClick}>Send Funds</button>
          </div>
        </Collapse>

        {this.state.resultsMessage && (
          <div id="results-message" className="text-center">
            {this.state.resultsMessage}
          </div>
        )}
      </div>
    );
  }
}

CreateContract.propTypes = {
  getContractOpenDates: PropTypes.func.isRequired,
  sendCreateContractOrder: PropTypes.func.isRequired,
  sendSendFundsOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  newContractAddress: PropTypes.string.isRequired,
  newContractTx: PropTypes.string.isRequired,
  newContractError: PropTypes.string,
  newContractFunded: PropTypes.string.isRequired,
  newContractFundsError: PropTypes.string,
  createContractAmount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  createContractAmount: state.form.create - contract.createContractAmount,
  newContractAddress: state.contract.newContractAddress,
  newContractTx: state.contract.newContractTx,
  newContractError: state.contract.newContractError,
  newContractFunded: state.contract.newContractFunded,
  newContractFundsError: state.contract.newContractFundsError
});

export default connect(
  mapStateToProps,
  { getContractOpenDates, sendCreateContractOrder, sendSendFundsOrder }
)(CreateContract);
