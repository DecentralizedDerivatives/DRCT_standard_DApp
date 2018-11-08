import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateContractFormContainer from './CreateContractFormContainer';
export class CreateContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsMessage: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newContractCreateError) {
      this.setState({
        resultsMessage: `Error: ${this.props.newContractError}`,
        sendFundsOpen: false
      });
    } else {
      this.props.close() 
    }
    
  }

  render() {
    return(
        <div className="create-contract">
        <div className="modal-background" onClick={this.props.close}></div>
        <div className="modal">
          <CreateContractFormContainer
            name="createContractForm" />
        </div>
      </div>
      )
  }
}

CreateContract.propTypes = {
  userAccount: PropTypes.string,
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
  mapStateToProps
)(CreateContract);
