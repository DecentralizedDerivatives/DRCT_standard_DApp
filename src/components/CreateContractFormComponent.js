import React from 'react';
import { Field } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import InputNumber from './InputNumber';
import Select from './Select.js';
import Datepicker from './datepicker';

export const CreateContractFormComponent = ({
  handleSubmit,
  onSubmit,
  formValues,
  change
}) => {
  return (
    <div>
      <h3>Create Contract</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Field
            name="duration"
            label="Select Duration"
            component={Select}
            options={{
              'One Week': 'One Week'
            }}
          />
        </InputGroup>

        <InputGroup>
          <Field
            name="currency"
            label="Select Currency"
            component={Select}
            options={{
              'BTC/USD': 'BTC/USD'
            }}
          />
        </InputGroup>
        <InputGroup>
          <Field
            name="startDate"
            label="Start Date"
            component={Datepicker}
            change={change}
          />
        </InputGroup>

        <InputGroup>
          <Field
            name="amount"
            label="Amount of Ether"
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

export default CreateContractFormComponent;
