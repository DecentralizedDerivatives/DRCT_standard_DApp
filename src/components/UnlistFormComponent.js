import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputText from './InputText';
import Select from './Select.js';

export const UnlistFormComponent = ({
  handleSubmit,
  onSubmit,
  submitting,
  formValues,
  change,
  selectOptions
}) => {
  return (
      <form className="unlist-order-form"  autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
          <button
            type="submit"
            disabled={submitting}
            className="order-submit-btn btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
  );
};

export default UnlistFormComponent;
