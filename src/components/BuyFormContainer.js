import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { sendBuyOrder } from '../actions/orderActions';
import BuyFormComponent from './BuyFormComponent';

const validate = values => {
  const errors = {};
  if (!values.orderId) {
    errors.orderId = 'Required';
  } else{
    values.orderId = values.orderId.replace(/\D/g,'');
  }
  return errors;
};

export let BuyFormContainer = props => {
  const submitForm = formValues => {
    // console.log('submitting Form: ', formValues);
    props.sendBuyOrder(formValues.orderId, props.userAccount);
  };

  return (
    <BuyFormComponent
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

BuyFormContainer.propTypes = {
  sendBuyOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

const formConfiguration = {
  form: 'buy-form',
  validate
};

BuyFormContainer = reduxForm(formConfiguration)(BuyFormContainer);

export default (BuyFormContainer = connect(
  mapStateToProps,
  { sendBuyOrder }
)(BuyFormContainer));
