import React from 'react';

const InputNumber = ({ input, label, meta: { touched, error } }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} placeholder={label} type="number" step="0.1" />

    {touched && (error && <span>{error}</span>)}
  </div>
);

export default InputNumber;
