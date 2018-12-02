import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { sendListOrder } from '../actions/orderActions';
import ListFormComponent from './ListFormComponent';

export const validate = values => {
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
  const submitForm = formValues => {
    formValues.token = props.positionInfo.address
    formValues.tokenAmount = props.tokenAmount
    // console.log('submitting Form: ', formValues);
    props.sendListOrder(formValues, props.userAccount);
  };

  return (
    <ListFormComponent
      handleSubmit={props.handleSubmit}
      onSubmit={submitForm}
      token={props.positionInfo.address}
      tokenAmount={props.tokenAmount}
    />
  );
};

ListFormContainer.propTypes = {
  sendListOrder: PropTypes.func.isRequired,
  userAccount: PropTypes.string,
  positionInfo: PropTypes.object.isRequired,
  tokenAmount: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount,
  tokenAmount: state.order.list.tokenAmount
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
