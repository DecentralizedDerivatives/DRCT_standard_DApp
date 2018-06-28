import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';

let CashOutForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount to Withdraw</label>
        <InputGroup>
          <Field
            name="withdrawAmount"
            component="input"
            type="number"
            placeholder="Amount to withdraw"
            step="0.01"
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
  form: 'cashout'
})(CashOutForm);

export default CashOutForm;
