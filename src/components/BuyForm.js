import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';

let BuyForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const validateNotEmpty = value => (!value ? 'Must enter a value' : null);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputGroup>
          <Field
            label="Buy Order ID "
            name="orderId"
            component={InputNumber}
            type="number"
            validate={validateNotEmpty}
          />
        </InputGroup>
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset Values
          </button>
        </div>
      </div>
    </form>
  );
};

BuyForm = reduxForm({
  form: 'buy',
  intialValues: {
    orderId: ''
  }
})(BuyForm);

export default BuyForm;
