import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';

const CashOutForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const closeForm = e => {
    e.preventDefault();
  };

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
          <button onClick={this.closeForm}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

CashOutForm = reduxForm({
  form: 'cashout'
})(CashOutForm);

export default CashOutForm;
