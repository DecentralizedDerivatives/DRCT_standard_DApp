import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputText from './InputText';
export const BuyFormComponent = ({
  onSubmit,
  handleSubmit
}) => {
  return (
      <form className="buy-order-form"  autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Field
            name="orderId"
            label="Order ID"
            component={InputText}
          />
        </InputGroup>
        <div>
          <button type="submit" className="order-submit-btn btn btn-primary">
            Submit
          </button>
        </div>
      </form>
  );
};

export default BuyFormComponent;
