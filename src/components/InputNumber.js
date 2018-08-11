import React from 'react';
import { InputGroupAddon } from 'reactstrap'
const InputNumber = ({ input, label, className, addonLabel, meta: { touched, error } }) => (
  <div className="input-number">
    <label htmlFor={input.name}>{label}</label>
    <input className={className} {...input} type="number" step=".00001" min="0" />
    {addonLabel&& (
      <InputGroupAddon addonType="append">{addonLabel}</InputGroupAddon>
    )}
    {touched && (error && <span className="input-error">{error}</span>)}
  </div>
);

export default InputNumber;