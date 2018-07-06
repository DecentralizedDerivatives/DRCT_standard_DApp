import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { sendCreateContractOrder } from '../actions/orderActions';
import CreateContractFormComponent from './CreateContractFormComponent';

export const CreateContractFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    this.props.sendCreateContractOrder(formValues, this.props.userAccount);
  };

  return (
    <CreateContractFormComponent
      formValues={props.formValues}
      change={props.change}
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
    />
  );
};

const mapStateToProps = state => ({
  formValues: getFormValues('create-contract')(state),
  userAccount: state.user.userAccount
});

const formConfiguration = {
  form: 'create-contract'
};

export default connect(
  mapStateToProps,
  { sendCreateContractOrder }
)(reduxForm(formConfiguration)(CreateContractFormContainer));
