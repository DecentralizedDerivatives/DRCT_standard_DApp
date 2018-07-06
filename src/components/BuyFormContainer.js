import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { sendBuyOrder } from '../actions/orderActions';
import BuyFormComponent from './BuyFormComponent';

export const BuyFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    this.props.sendBuyOrder(formValues, this.props.userAccount);
  };

  return (
    <BuyFormComponent
      formValues={props.formValues}
      change={props.change}
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

const mapStateToProps = state => ({
  formValues: getFormValues('buy-form')(state),
  userOrders: state.user.userOrders
});
const formConfiguration = {
  form: 'buy-form'
};

export default connect(
  mapStateToProps,
  { sendBuyOrder }
)(reduxForm(formConfiguration)(BuyFormContainer));
