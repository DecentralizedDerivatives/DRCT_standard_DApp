import React from 'react';
import { Field } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import InputNumber from './InputNumber';
import Select from './Select.js';
import { factories } from '../factoryProvider';

export const CreateContractFormComponent = ({
  handleSubmit,
  onSubmit,
  contractDates,
  onCurrencyChange
}) => {
  let factoryList = factories().reduce((obj, item) => {
    obj[item.address] = item.symbol + ' (' + item.multiplier + 'X multiplier)';
    return obj
  }, {})
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup className="form-dropdown">
        <Field
          name="duration"
          label="Select Duration"
          component={Select}
          options={{
            'One Week': 'One Week'
          }}
        />
      </InputGroup>

      <InputGroup className="form-dropdown">
        <Field
          name="currency"
          label="Select Underlying"
          component={Select}
          options={factoryList}
          onChange={onCurrencyChange}
        />
      </InputGroup>
      <InputGroup className="form-dropdown">
        <Field
          name="startDate"
          label="Start Date"
          component={Select}
          options={contractDates}
        />
      </InputGroup>

      <InputGroup className="form-eth-input">
        <Field name="amount" label="Amount of Ether" component={InputNumber} />
        <InputGroupAddon addonType="append">ETH</InputGroupAddon>
      </InputGroup>

      <div className="form-submit-wrapper">
        <button type="submit" className="form-submit btn btn-primary">
          Create Contract
        </button>
      </div>
    </form>
  );
};

export default CreateContractFormComponent;
