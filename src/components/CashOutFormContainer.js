import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { sendCashOutRequest } from '../actions/orderActions';
import CashOutFormComponent from './CashOutFormComponent';

export const CashOutFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    this.props.sendCashOutRequest(formValues, this.props.userAccount);
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

const mapStateToProps = state => ({
  formValues: getFormValues('cashout-form')(state),
  userOrders: state.user.userOrders
});
const formConfiguration = {
  form: 'cashout-form'
};

export default connect(
  mapStateToProps,
  { sendCashOutRequest }
)(reduxForm(formConfiguration)(CashOutFormContainer));
