import React from 'react';
import { Field } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import InputNumber from './InputNumber';

export const CashOutFormComponent = ({
  handleSubmit,
  maxBalanceClick,
  onSubmit
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
          <button onClick={maxBalanceClick} className="btn btn-danger btn-md">
            Max
          </button>
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CashOutFormComponent;
