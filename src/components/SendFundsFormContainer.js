import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import SendFundsFormComponent from './SendFundsFormComponent';

const validate = values => {
  const errors = {};
  if (!values.address) {
    errors.address = 'Required';
  }

  if (!values.amount) {
    errors.amount = 'Required';
  }

  if (!values.currency) {
    errors.currency = 'Required';
  }

  return errors;
};

export let SendFundsFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    props.sendFunds(formValues, props.userAccount);
  };

  return (
    <SendFundsFormComponent
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

SendFundsFormContainer.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  userAccount: PropTypes.string,
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

const formConfiguration = {
  form: 'create-contract',
  validate
};

SendFundsFormContainer = reduxForm(formConfiguration)(
  SendFundsFormContainer
);

export default (SendFundsFormContainer = connect(
  mapStateToProps, null)(SendFundsFormContainer));
