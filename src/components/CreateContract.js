import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import CreateContractFormContainer from './CreateContractFormContainer';
import { sendSendFundsOrder } from '../actions/orderActions';

// Use named export for unconnected component for testing
export class CreateContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendFundsOpen: false,
      resultsMessage: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newContractCreateError) {
      this.setState({
        resultsMessage: `Error: ${this.props.newContractError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else if (nextProps.newContract.address) {
      this.setState({
        resultsMessage: `Address result ${this.props.newContract.address}`,
        sendFundsOpen: true,
        formOpen: false
      });
    } else if (nextProps.newContractFundsError) {
      this.setState({
        resultsMessage: `Error: ${this.props.newContractFundsError}`,
        sendFundsOpen: false,
        formOpen: false
      });
    } else if (nextProps.newContract.funded) {
      this.setState({
        resultsMessage: `Contract successfully funded.`,
        sendFundsOpen: false,
        formOpen: false
      });
    }
  }

  handleSendFundsClick = e => {
    console.log('CONTRACT DETAILS', this.props.newContract);
    this.props.sendSendFundsOrder(this.props.newContract, this.props.userAccount);
  };

  render() {
    return(
      this.state.sendFundsOpen ? (
        <div className="create-contract" >
        <div className="modal-background" onClick={this.props.close}></div>
        <div className="modal" style={{height:"230px"}}>
          <div id="send-funds">
            <h3 className="created-address">
              Address Result : {this.props.newContract.address}
            </h3>
            <button
              onClick={this.handleSendFundsClick}
            >
            Send Funds
            </button>
          </div>
        </div>
        </div>
      ):(
        <div className="create-contract">
        <div className="modal-background" onClick={this.props.close}></div>
        <div className="modal">
        <CreateContractFormContainer name="createContractForm" />
        </div>
      </div>
      )
    )
  }
}

CreateContract.propTypes = {
  sendSendFundsOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired,
  newContract: PropTypes.object,
  newContractFundsError: PropTypes.string,
  createContractAmount: PropTypes.number
};


const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  newContract: state.contract.newContract,
  newContractCreateError: state.contract.newContractCreateError,
  newContractFundsError: state.contract.newContractFundsError
});

export default connect(
  mapStateToProps,
  { sendSendFundsOrder }
)(CreateContract);
