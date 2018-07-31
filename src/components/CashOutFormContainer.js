import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
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
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    props.sendCashOutRequest(formValues.withdrawAmount, props.userAccount);
  };

  return (
    <CashOutFormComponent
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

CashOutFormContainer.propTypes = {
  sendCashOutRequest: PropTypes.func.isRequired,
  userAccount: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

const formConfiguration = {
  form: 'cashout-form',
  validate
};

CashOutFormContainer = reduxForm(formConfiguration)(CashOutFormContainer);

export default (CashOutFormContainer = connect(
  mapStateToProps, { sendCashOutRequest }
)(CashOutFormContainer));
