import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { sendCashOutRequest } from '../actions/userActions';
import CashOutFormComponent from './CashOutFormComponent';

export let CashOutFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    props.sendCashOutRequest();
  };
  return (
    <CashOutFormComponent
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

CashOutFormContainer.propTypes = {
  sendCashOutRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  userBalance: state.user.userBalance
});

const formConfiguration = {
  form: 'cashout-form'
};

CashOutFormContainer = reduxForm(formConfiguration)(CashOutFormContainer);

export default (CashOutFormContainer = connect(
  mapStateToProps, { sendCashOutRequest }
)(CashOutFormContainer));
