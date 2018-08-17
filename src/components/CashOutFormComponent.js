import React from 'react';
import { Field } from 'redux-form';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import InputNumber from './InputNumber';

export const CashOutFormComponent = ({
  handleSubmit,
  onSubmit
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="order-btn-wrapper">
        <div className="order-btn"   style={{width:'150px'}}>
          <button className="order-btn-button">
            Wtihdraw
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default CashOutFormComponent;
