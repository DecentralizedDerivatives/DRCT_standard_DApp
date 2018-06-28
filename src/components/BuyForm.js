import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup } from 'reactstrap';

let BuyForm = props => {
  const { handleSubmit, pristine, reset, submitting, onChange, value } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Buy Order ID</label>
        <InputGroup>
          <Field
            name="orderId"
            component="input"
            type="number"
            value={value}
            placeholder="Enter the Order ID"
            onChange={onChange}
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
  form: 'buy'
})(BuyForm);

export default BuyForm;
