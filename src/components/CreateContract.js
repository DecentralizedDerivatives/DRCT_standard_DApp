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
      newContractAddress:  "0xd5980579aff2ce3187740decbc78221362971c8e",
      createContractAmount: 0.01//this.props.newContractAmount
    };
    console.log('s',this.sendFundDetails);

    this.props.sendSendFundsOrder(sendFundsDetails, this.props.userAccount);
  };

  render() {
    return this.state.sendFundsOpen?(
      // <div className="container">
      //   <div id="create-contract-button">
      //     <button onClick={this.toggleFormVisibility} className="btn btn-info">
      //       Create Contract
      //     </button>
      //   </div>

      //   <Collapse isOpen={this.state.formOpen}>
      //     <div id="create-contract-form">
      //       <h4 className="center-text">Create Contract</h4>
      //       <CreateContractFormContainer name="createContractForm" />
      //     </div>
      //   </Collapse>

      //   <Collapse isOpen={this.state.sendFundsOpen}>
      //     <div id="send-funds">
      //       <h4 className="center-text">Contract Created</h4>
      //       <button
      //         className="btn btn-success"
      //         onClick={this.handleSendFundsClick}
      //       >
      //         Send Funds
      //       </button>
      //     </div>
      //   </Collapse>

        // {this.state.resultsMessage && (
        //   <div id="results-message" className="text-center">
        //     {this.state.resultsMessage}
        //   </div>
        // )}
      // </div> 
      <div className="create-contract" >
      <div className="modal-background" onClick={this.props.close}></div>
      <div className="modal" style={{height:"230px"}}>
        <div id="send-funds">
          <h3 className="created-address">
            Address Result : {this.props.newContractAddress}
          </h3>
          <button
            onClick={this.handleSendFundsClick}
          >
          Send Funds
          </button>
        </div>
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
    );
  }
}

CreateContract.propTypes = {
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
  { sendSendFundsOrder }
)(CreateContract);
