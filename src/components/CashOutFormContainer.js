import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm,change } from 'redux-form';
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

  const maxBalanceClick = e => {
    e.preventDefault();
    props.change('withdrawAmount',props.userBalance)
  }

  return (
    <CashOutFormComponent
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
      maxBalanceClick={maxBalanceClick}
    />
  );
};

CashOutFormContainer.propTypes = {
  sendCashOutRequest: PropTypes.func.isRequired,
  userAccount: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  userBalance: state.user.userBalance
});

const formConfiguration = {
  form: 'cashout-form',
  validate
};

CashOutFormContainer = reduxForm(formConfiguration)(CashOutFormContainer);

export default (CashOutFormContainer = connect(
  mapStateToProps, { sendCashOutRequest }
)(CashOutFormContainer));
