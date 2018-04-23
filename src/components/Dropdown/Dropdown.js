import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const Dropdown = ({ menuItems, onChange, value, name, className }) => {
  const options = menuItems.map(item => (<MenuItem value={item} key={item}>{item}</MenuItem>));

  return (
    <FormControl>
      <Select
        value={value || menuItems[0]}
        onChange={onChange}
        className={className}
        inputProps={{
          name,
          id: name,
        }}
      >
        {options}
      </Select>
    </FormControl>
  );
}

Dropdown.propTypes = {
  menuItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Dropdown;
