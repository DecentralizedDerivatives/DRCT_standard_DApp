import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';

const Dropdown = ({menuItems, onChange, value, name, className, menuItemClass, disableUnderline, selectBackground}) => {
  const options = menuItems.map(item => (
    <MenuItem className={menuItemClass} value={item} key={item}>
      {item}
    </MenuItem>
  ));

  return (
    <FormControl>
      <Select
        value={value || menuItems[0]}
        onChange={onChange}
        className={className}
        SelectDisplayProps={{ style: { background: selectBackground }}}
        disableUnderline={disableUnderline}
        inputProps={{
          name,
          id: name,
        }}
      >
        {options}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  menuItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  menuItemClass: PropTypes.string,
  disableUnderline: PropTypes.bool,
  selectBackground: PropTypes.string,
};

export default Dropdown;
