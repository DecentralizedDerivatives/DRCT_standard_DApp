import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, getFormValues } from 'redux-form';
import { sendCreateContractOrder } from '../actions/orderActions';
import { getContractOpenDates } from '../actions/contractActions';
import CreateContractFormComponent from './CreateContractFormComponent';

const validate = values => {
  const errors = {};
  if (!values.duration) {
    errors.duration = 'Required';
  }

  if (!values.currency) {
    errors.currency = 'Required';
  }

  if (!values.startDate) {
    errors.startDate = 'Required';
  }

  if (!values.amount) {
    errors.amount = 'Required';
  }

  return errors;
};

export let CreateContractFormContainer = props => {
  const submitForm = formValues => {
    // console.log('submitting Form: ', formValues);
    props.sendCreateContractOrder(formValues, props.userAccount);
  };

  const onCurrencyChange = async evt => {
    var address = evt.target.value;
    await props.getContractOpenDates(address);
  };

  return (
    <div>
      <CreateContractFormComponent
        formValues={props.formValues}
        contractDates={props.contractDates}
        onCurrencyChange={onCurrencyChange}
        onSubmit={submitForm}
        handleSubmit={props.handleSubmit} />
    </div>
  );
};

CreateContractFormContainer.propTypes = {
  sendCreateContractOrder: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  userAccount: PropTypes.string
};

const mapStateToProps = state => ({
  formValues: getFormValues('create-contract')(state),
  userAccount: state.user.userAccount,
  contractDates: state.contract.contractOpenDates
});

const formConfiguration = {
  form: 'create-contract',
  validate
};

CreateContractFormContainer = reduxForm(formConfiguration)(
  CreateContractFormContainer
);

export default (CreateContractFormContainer = connect(
  mapStateToProps,
  { getContractOpenDates, sendCreateContractOrder }
)(CreateContractFormContainer));
