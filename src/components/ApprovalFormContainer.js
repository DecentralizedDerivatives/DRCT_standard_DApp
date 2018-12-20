import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { sendApproveOrder } from '../actions/orderActions';
import ApprovalFormComponent from './ApprovalFormComponent';

export const validate = values => {
  const errors = {};
  if (!values.tokenAmount) {
    errors.tokenAmount = 'Required';
  }
  return errors;
};

export let ApprovalFormContainer = props => {
  const submitForm = formValues => {
    props.sendApproveOrder(formValues, props.positionInfo.address, props.userAccount);
  };

  return (
    <ApprovalFormComponent
      handleSubmit={props.handleSubmit}
      onSubmit={submitForm}
      positionInfo={props.positionInfo}
    />
  );
};

ApprovalFormContainer.propTypes = {
  sendApproveOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string,
  positionInfo: PropTypes.object,
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
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
