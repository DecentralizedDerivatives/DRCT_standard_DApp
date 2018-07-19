import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, getFormValues } from 'redux-form';
import { sendCashOutRequest } from '../actions/userActions';
import CashOutFormComponent from './CashOutFormComponent';

const validate = values => {
  const errors = {};
  if (!values.withdrawAmount) {
    errors.withdrawAmount = 'Required';
  }

  return errors;
};

export let CashOutFormContainer = props => {
  const submitForm = (formValues, sendCashOutRequest, userAccount) => {
    console.log('submitting Form: ', formValues);
    sendCashOutRequest(formValues, userAccount);
  };

  return (
    <CashOutFormComponent
      formValues={props.formValues}
      change={props.change}
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

CashOutFormComponent.propTypes = {
  // sendCashOutRequest: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  userOrders: PropTypes.array
};

const mapStateToProps = state => ({
  formValues: getFormValues('cashout-form')(state),
  userOrders: state.user.userOrders
});

const formConfiguration = {
  form: 'cashout-form',
  validate
};

CashOutFormContainer = reduxForm(formConfiguration)(CashOutFormContainer);

export default (CashOutFormContainer = connect(
  mapStateToProps,
  { sendCashOutRequest }
)(CashOutFormContainer));
