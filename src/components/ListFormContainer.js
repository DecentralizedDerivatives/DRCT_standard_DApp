import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, getFormValues } from 'redux-form';
import { sendListOrder } from '../actions/orderActions';
import ListFormComponent from './ListFormComponent';

const validate = values => {
  const errors = {};
  if (!values.token) {
    errors.token = 'Required';
  }

  if (!values.price) {
    errors.price = 'Required';
  }

  if (!values.tokenAmount) {
    errors.tokenAmount = 'Required';
  }

  return errors;
};

export let ListFormContainer = props => {
  const submitForm = (formValues, sendListOrder, userAccount) => {
    console.log('submitting Form: ', formValues);
    sendListOrder(formValues, userAccount);
  };

  return (
    <ListFormComponent
      formValues={props.formValues}
      change={props.change}
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
      selectOptions={props.userTokens}
    />
  );
};

ListFormContainer.propTypes = {
  sendListOrder: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  userTokens: PropTypes.array
};

const mapStateToProps = state => ({
  formValues: getFormValues('list-form')(state),
  userTokens: state.user.userTokens
});

const formConfiguration = {
  form: 'list-form',
  validate
};

ListFormContainer = reduxForm(formConfiguration)(ListFormContainer);

export default (ListFormContainer = connect(
  mapStateToProps,
  { sendListOrder }
)(ListFormContainer));
