import React from 'react';
import { Field } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import InputText from './InputText';
import InputNumber from './InputNumber';
import Select from './Select.js';
import { factories } from '../factoryProvider';

export const SendFundsFormComponent = ({
  handleSubmit,
  onSubmit
}) => {
  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <InputGroup className="form-dropdown">
        <Field
          name="currency"
          label="Select Currency"
          component={Select}
          options={factories(true)}
        />
      </InputGroup>
      <InputGroup className="form-eth-input">
        <Field
          name="address"
          label="Swap Address"
          component={InputText} />
      </InputGroup>
      <InputGroup className="form-eth-input">
        <Field name="amount" label="Amount of Ether" component={InputNumber} />
        <InputGroupAddon addonType="append">ETH</InputGroupAddon>
      </InputGroup>

      <div className="form-submit-wrapper">
        <button type="submit" className="form-submit btn btn-primary">
          Send Funds
        </button>
      </div>
    </form>
  );
};

export default SendFundsFormComponent;
