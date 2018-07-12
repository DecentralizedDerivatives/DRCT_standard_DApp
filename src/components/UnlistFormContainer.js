import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { sendUnlistOrder } from '../actions/orderActions';
import UnlistFormComponent from './UnlistFormComponent';

export const UnlistFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    this.props.sendUnlistOrder(formValues, this.props.userAccount);
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

const mapStateToProps = state => ({
  formValues: getFormValues('unlist-form')(state),
  userOrders: state.user.userOrders
});
const formConfiguration = {
  form: 'unlist-form'
};

export default connect(
  mapStateToProps,
  { sendUnlistOrder }
)(reduxForm(formConfiguration)(UnlistFormContainer));
