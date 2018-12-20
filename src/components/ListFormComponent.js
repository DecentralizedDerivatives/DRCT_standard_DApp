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
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <label style={{margin: '6px 0'}}><strong>Token:</strong></label>
        <div>{token}</div>
        <br />
        <label style={{margin: '6px 6px 0 0'}}><strong>Amount:</strong></label>
        <span>{tokenAmount}</span>

        <InputGroup className="order-input-wrapper">
          <Field
            name="price"
            label="Enter Price in ETH"
            className="order-input"
            component={InputNumber}
            addonLabel="ETH"
            step="0.00001"
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
