import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, getFormValues } from 'redux-form';
import { sendBuyOrder } from '../actions/orderActions';
import BuyFormComponent from './BuyFormComponent';

export let BuyFormContainer = props => {
  const submitForm = (formValues, sendBuyOrder, userAccount) => {
    console.log('submitting Form: ', formValues);
    sendBuyOrder(formValues, userAccount);
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

BuyFormContainer.propTypes = {
  sendBuyOrder: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  userOrders: PropTypes.array
};

const mapStateToProps = state => ({
  formValues: getFormValues('buy-form')(state),
  userOrders: state.user.userOrders
});

const formConfiguration = {
  form: 'buy-form'
};

BuyFormContainer = reduxForm(formConfiguration)(BuyFormContainer);

export default (BuyFormContainer = connect(
  mapStateToProps,
  { sendBuyOrder }
)(BuyFormContainer));
