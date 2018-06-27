import React from 'react';
import PropTypes from 'prop-types';
import '../styles/dropdown.css';

const Dropdown = ({ options, name, value, onChange, className }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="input">
      <select
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Dropdown;
