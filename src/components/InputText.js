import React from 'react';

export const InputText = ({ label, input, meta: { touched, error } }) => {
  return (
    <div className="input-text">
      <label className="b sans-serif pv2 w-100">{label}</label>
      <input
        {...input}
        placeholder={label}
        type="text"
      />

      {touched && (error && <span className="input-error">{error}</span>)}
    </div>
  );
};

export default InputText;
