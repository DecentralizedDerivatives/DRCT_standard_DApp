import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { sendListOrder } from '../actions/orderActions';
import ListFormComponent from './ListFormComponent';

export const ListFormContainer = props => {
  const submitForm = formValues => {
    console.log('submitting Form: ', formValues);
    this.props.sendListOrder(formValues, this.props.userAccount);
  };

  return (
    <ListFormComponent
      formValues={props.formValues}
      change={props.change}
      onSubmit={submitForm}
      handleSubmit={props.handleSubmit}
      selectOptions={this.props.userTokens}
    />
  );
};

const mapStateToProps = state => ({
  formValues: getFormValues('list-form')(state),
  userTokens: state.user.userTokens
});
const formConfiguration = {
  form: 'list-form'
};

export default connect(
  mapStateToProps,
  { sendListOrder }
)(reduxForm(formConfiguration)(ListFormContainer));
