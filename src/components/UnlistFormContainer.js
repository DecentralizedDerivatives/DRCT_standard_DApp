import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, getFormValues } from 'redux-form';
import { sendUnlistOrder } from '../actions/orderActions';
import UnlistFormComponent from './UnlistFormComponent';

export let UnlistFormContainer = props => {
  const submitForm = (formValues, sendUnlistOrder, userAccount) => {
    console.log('submitting Form: ', formValues);
    sendUnlistOrder(formValues, userAccount);
  };

  return (
    <UnlistFormComponent
      formValues={props.formValues}
      change={props.change}
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
      selectOptions={props.userOrders}
    />
  );
};

UnlistFormContainer.propTypes = {
  sendUnlistOrder: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  userOrders: PropTypes.array
};

const mapStateToProps = state => ({
  formValues: getFormValues('unlist-form')(state),
  userOrders: state.user.userOrders
});

const formConfiguration = {
  form: 'unlist-form'
};

UnlistFormContainer = reduxForm(formConfiguration)(UnlistFormContainer);

export default (UnlistFormContainer = connect(
  mapStateToProps,
  { sendUnlistOrder }
)(UnlistFormContainer));
