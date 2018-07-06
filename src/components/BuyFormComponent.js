import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputText from './InputText';

export const BuyFormComponent = ({
  handleSubmit,
  onSubmit,
  formValues,
  change,
  selectOptions
}) => {
  return (
    <div>
      <h3>Buy Order</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Field
            name="orderID"
            label="Select Order to Buy"
            component={InputText}
          />
        </InputGroup>

        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyFormComponent;
