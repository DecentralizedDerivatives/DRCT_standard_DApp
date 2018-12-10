import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';

export const ApprovalFormComponent = ({
  handleSubmit,
  onSubmit,
  positionInfo
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <p>{positionInfo.tokenType + ' ' + positionInfo.symbol + ': ' + positionInfo.balance + ' (' + positionInfo.date + ')'}</p>
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
