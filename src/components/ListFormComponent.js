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
  selectOptions = selectOptions.reduce((obj, item) => {
    obj[item.address] = item.date + ': ' + item.balance + ' (' + item.address + ')';
    return obj
  }, {})
  return (
      <form  autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="order-input-wrapper">
          <Field
            name="token"
            label="Select Token"
            component={Select}
            options={selectOptions}
          />
        </InputGroup>

        <InputGroup className="order-input-wrapper">
          <Field
            name="price"
            label="Enter Price in ETH"
            className="order-input"       
            component={InputNumber}
            addonLabel={"ETH"}
          />
        </InputGroup>

        <InputGroup className="order-input-wrapper">
          <Field
            name="tokenAmount"
            label="Amount of Token"
            className="order-input"
            component={InputNumber}
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

export default ListFormComponent;
