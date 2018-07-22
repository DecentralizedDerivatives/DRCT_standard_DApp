import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { sendUnlistOrder } from '../actions/orderActions';
import UnlistFormComponent from './UnlistFormComponent';

const validate = values => {
  const errors = {};
  if (!values.orderId) {
    errors.orderId = 'Required';
  }

  return errors;
};

export let UnlistFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    props.sendUnlistOrder(formValues.orderId, props.userAccount);
  };

  return (
    <UnlistFormComponent
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

UnlistFormContainer.propTypes = {
  sendUnlistOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

const formConfiguration = {
  form: 'unlist-form',
  validate
};

UnlistFormContainer = reduxForm(formConfiguration)(UnlistFormContainer);

export default (UnlistFormContainer = connect(
  mapStateToProps,
  { sendUnlistOrder }
)(UnlistFormContainer));
