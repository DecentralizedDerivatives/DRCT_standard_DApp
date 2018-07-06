import React from 'react';

const InputNumber = ({ input, label }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} placeholder={label} type="number" step="0.1" />
  </div>
);

export default InputNumber;
