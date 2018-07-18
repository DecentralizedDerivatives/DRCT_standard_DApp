import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';

export const CashOutFormComponent = ({
  handleSubmit,
  onSubmit,
  submitting,
  formValues,
  change
}) => {
  return (
    <div>
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
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CashOutFormComponent;
