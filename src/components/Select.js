import React from 'react';

export const Select = props => {
  const {
    input,
    label,
    meta: { touched, error },
    options
  } = props;

  const renderSelectOptions = (key, index) => {
    return (
      <option key={`${index}-${key}`} value={key}>
        {options[key]}
      </option>
    );
  };

  if (props && options) {
    return (
      <div className="mv3 w-100">
        <div className="b sans-serif pv2 w-100">{label}</div>
        <select {...input} className="pa2 input-reset ba b--black-40 w-100">
          <option value="">Select</option>
          {Object.keys(options).map(renderSelectOptions)}
        </select>
        {touched && (error && <span>{error}</span>)}
      </div>
    );
  }
  return <div />;
};

export default Select;
