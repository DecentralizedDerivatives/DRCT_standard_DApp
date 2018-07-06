import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';
import Select from './Select.js';

export const UnlistFormComponent = ({
  handleSubmit,
  onSubmit,
  formValues,
  change,
  selectOptions
}) => {
  return (
    <div>
      <h3>Unlist Order</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Field
            name="orderID"
            label="Select Order to Unlist"
            component={Select}
            options={selectOptions}
          />
        </InputGroup>

        <InputGroup>
          <Field
            name="orderID"
            label="Or enter Order ID"
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

export default UnlistFormComponent;
