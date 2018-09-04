import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';
import Select from './Select.js';

export const ApprovalFormComponent = ({
  handleSubmit,
  onSubmit,
  selectOptions
}) => {
  selectOptions = selectOptions.reduce((obj, item) => {
    obj[item.address] = item.tokenType + ' ' + item.symbol + ': ' + item.balance + ' (' + item.date + ')';
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
        <br />
        <InputGroup>
          <Field
            name="tokenAmount"
            label="Token Amount"
            component={InputNumber}
            step={"0.00001"}
          />
        </InputGroup>
        <br />
        <div>
          <button
            type="submit"
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
