import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import CreateContractFormContainer from './CreateContractFormContainer';
import { getContractOpenDates } from '../actions/contractActions';
import { sendSendFundsOrder } from '../actions/orderActions';

// Use named export for unconnected component for testing
export class CreateContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      sendFundsOpen: false,
      resultsMessage: ''
    };
  }

  async componentWillMount() {
    await this.props.getContractOpenDates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newContractCreateError) {
      this.setState({
        resultsMessage: `Error: ${this.props.newContractError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else if (nextProps.newContractAddress) {
      this.setState({
        resultsMessage: `Address result ${this.props.newContractAddress}`,
        sendFundsOpen: true,
        formOpen: false
      });
    } else if (nextProps.newContractFundsError) {
      this.setState({
        resultsMessage: `Error: ${this.props.newContractFundsError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else if (nextProps.newContractFunded) {
      this.setState({
        resultsMessage: `Contract successfully funded.`,
        sendFundsOpen: false,
        formOpen: false
      });
    }
  }

  handleSendFundsClick = e => {
    const sendFundsDetails = {
      newContractAddress: this.props.newContractAddress,
      newContractAmount: this.props.newContractAmount
    };

    this.props.sendSendFundsOrder(sendFundsDetails, this.props.userAccount);
  };

  toggleFormVisibility = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  };

  render() {
    return (
      <div className="container">
        <div id="create-contract-button">
          <button onClick={this.toggleFormVisibility} className="btn btn-info">
            Create Contract
          </button>
        </div>

        <Collapse isOpen={this.state.formOpen}>
          <div id="create-contract-form">
            <h4 className="center-text">Create Contract</h4>
            <CreateContractFormContainer name="createContractForm" />
          </div>
        </Collapse>

        <Collapse isOpen={this.state.sendFundsOpen}>
          <div id="send-funds">
            <h4 className="center-text">Contract Created</h4>
            <button
              className="btn btn-success"
              onClick={this.handleSendFundsClick}
            >
              Send Funds
            </button>
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
  sendSendFundsOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  newContractAddress: PropTypes.string,
  newContractCreateError: PropTypes.string,
  newContractFunded: PropTypes.bool,
  newContractFundsError: PropTypes.string,
  createContractAmount: PropTypes.number
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  newContractAmount: state.contract.newContract.amount,
  newContractAddress: state.contract.newContract.address,
  newContractCreateError: state.contract.newContractCreateError,
  newContractFunded: state.contract.newContract.funded,
  newContractFundsError: state.contract.newContractFundsError
});

export default connect(
  mapStateToProps,
  { getContractOpenDates, sendSendFundsOrder }
)(CreateContract);
