import React from 'react';
import { InputGroupAddon } from 'reactstrap'
const InputNumber = ({ input, label, className, step, addonLabel, meta: { touched, error } }) => (
  <div className="input-number">
    <label className='input-label' htmlFor={input.name}>{label}</label>
    <input className={className} {...input} type="number" step={step} min="0" />
    {addonLabel&& (
      <InputGroupAddon addonType="append">{addonLabel}</InputGroupAddon>
    )}
    {touched && (error && <span className="input-error">{error}</span>)}
  </div>
);

export default InputNumber;
