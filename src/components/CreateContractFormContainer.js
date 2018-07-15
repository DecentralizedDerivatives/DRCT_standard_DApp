import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { sendCreateContractOrder } from '../actions/orderActions';
import { getContractOpenDates } from '../actions/contractActions';
import CreateContractFormComponent from './CreateContractFormComponent';

export const CreateContractFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    props.sendCreateContractOrder(formValues, props.userAccount);
  };
  const onCurrencyChange = async (evt) => {
    var address = evt.target.value;
    await props.getContractOpenDates(address);
  }
  return (
    <CreateContractFormComponent
      formValues={props.formValues}
      onCurrencyChange={onCurrencyChange}
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
  { getContractOpenDates, sendCreateContractOrder }
)(reduxForm(formConfiguration)(CreateContractFormContainer));
