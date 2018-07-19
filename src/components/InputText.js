import React from 'react';

export const InputText = ({ label, input, meta: { touched, error } }) => {
  return (
    <div className="mv4 w-100">
      <div className="b sans-serif pv2 w-100">{label}</div>
      <input
        {...input}
        placeholder={label}
        type="text"
        className="pa2 ba b--black-40 w-100"
      />

      {touched && (error && <span>{error}</span>)}
    </div>
  );
};

export default InputText;
