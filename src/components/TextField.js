import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  id,
  type,
  className,
  placeholder,
  label,
  name,
  value,
  onChange,
  disabled,
  helperText
}) => {
  return (
    <div className="input-field">
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label for={id}>{label}</label>
      <span class="helper-text" data-error="wrong" data-success="right">
        {helperText}
      </span>
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.string,
  helperText: PropTypes.string
};

TextField.defaultProps = {
  type: 'text'
};

export default TextField;
