import React from 'react';
import { Field } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import InputNumber from './InputNumber';
import Select from './Select.js';

export const ListFormComponent = ({
  handleSubmit,
  onSubmit,
  submitting,
  formValues,
  change,
  selectOptions
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Field
            name="token"
            label="Select Token"
            component={Select}
            options={selectOptions}
          />
        </InputGroup>

        <InputGroup>
          <Field
            name="price"
            label="Enter Price in ETH"
            component={InputNumber}
          />
          <InputGroupAddon addonType="append">ETH</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <Field
            name="tokenAmount"
            label="Amount of Token"
            component={InputNumber}
          />
        </InputGroup>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListFormComponent;
