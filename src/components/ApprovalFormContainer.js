import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { sendApproveOrder } from '../actions/orderActions';
import ApprovalFormComponent from './ApprovalFormComponent';

const validate = values => {
  const errors = {};
  if (!values.token) {
    errors.token = 'Required';
  }
  if (!values.tokenAmount) {
    errors.tokenAmount = 'Required';
  }
  return errors;
};

export let ApprovalFormContainer = props => {
  const submitForm = formValues => {
    // console.log('submitting Form: ', formValues);

    props.sendApproveOrder(formValues, props.userAccount);
  };

  return (
    <ApprovalFormComponent
      handleSubmit={props.handleSubmit}
      onSubmit={submitForm}
      selectOptions={props.userTokens}
    />
  );
};

ApprovalFormContainer.propTypes = {
  sendApproveOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string,
  userTokens: PropTypes.array,
};

const mapStateToProps = state => ({
  userTokens: state.user.userTokens,
  userAccount: state.user.userAccount,
  selectedToken: state.selectedToken
});

const formConfiguration = {
  form: 'approval-form',
  validate
};

ApprovalFormContainer = reduxForm(formConfiguration)(ApprovalFormContainer);

export default (ApprovalFormContainer = connect(
  mapStateToProps,
  { sendApproveOrder }
)(ApprovalFormContainer));
