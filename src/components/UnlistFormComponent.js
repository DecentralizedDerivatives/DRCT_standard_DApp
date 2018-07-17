import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputText from './InputText';
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
            name="orderId"
            label="Select Order to Unlist"
            component={Select}
            options={selectOptions}
          />
        </InputGroup>

        <InputGroup>
          <Field
            name="orderId"
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
