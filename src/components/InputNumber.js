import React from 'react';

const InputNumber = ({ input, label, meta: { touched, error } }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} type="number" />
    {touched && error && <span className="error">{error}</span>}
  </div>
);

export default InputNumber;
