import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';
import Select from './Select.js';

export const ApprovalFormComponent = ({
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
            name="tokenAmount"
            label="Token Amount"
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

export default ApprovalFormComponent;
