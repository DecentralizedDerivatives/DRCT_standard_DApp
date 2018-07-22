import React from 'react';
import { Field } from 'redux-form';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';

export const ListFormComponent = ({
  handleSubmit,
  onSubmit,
  token,
  tokenAmount
}) => {
  return (
      <form  autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <label>Token</label>
        <div>{token}</div>
        <label>Amount</label>
        <div>{tokenAmount}</div>

        <InputGroup className="order-input-wrapper">
          <Field
            name="price"
            label="Enter Price in ETH"
            className="order-input"
            component={InputNumber}
            addonLabel={"ETH"}
          />
        </InputGroup>
        <div>
          <button
            type="submit"
            className="order-submit-btn btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
  );
};

export default ListFormComponent;
