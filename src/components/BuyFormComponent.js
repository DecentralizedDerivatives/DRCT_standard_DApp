import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';

export const BuyFormComponent = ({
  handleSubmit,
  onSubmit,
  submitting,
  formValues,
  change,
  selectOptions
}) => {
  return (
      <form className="buy-order-form"  autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="order-input-wrapper">
          <Field className="order-input" name="orderId" label="Order Id" component={InputNumber} />
        </InputGroup>
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="order-submit-btn btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
  );
};

export default BuyFormComponent;
