import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputText from './InputText';

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
        <div className="order-input-wrapper">
            <h3>Buy Order ID :</h3>
            <input className="order-id-input" name="orderId" type="number" min="0"/>
            <h4>Enter the order ID</h4>
        </div>
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
