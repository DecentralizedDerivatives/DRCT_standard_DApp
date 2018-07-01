import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import InputNumber from './InputNumber';

let CashOutForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const validateNotEmpty = value => (!value ? 'Must enter a value' : null);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputGroup>
          <Field
            label="Amount to Withdraw"
            name="withdrawAmount"
            component={InputNumber}
            type="number"
            step="0.01"
            validate={validateNotEmpty}
          />
          <InputGroupAddon addonType="append">ETH</InputGroupAddon>
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

CashOutForm = reduxForm({
  form: 'cashout',
  initialValues: {
    withdrawAmount: 0
  }
})(CashOutForm);

export default CashOutForm;
