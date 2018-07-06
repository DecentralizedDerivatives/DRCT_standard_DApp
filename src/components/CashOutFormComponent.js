import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';

export const CashOutFormComponent = ({
  handleSubmit,
  onSubmit,
  formValues,
  change
}) => {
  return (
    <div>
      <h3>CashOut Order</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Field
            label="Amount to Withdraw"
            name="withdrawAmount"
            component={InputNumber}
          />
          <InputGroupAddon addonType="append">ETH</InputGroupAddon>
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

export default CashOutFormComponent;
