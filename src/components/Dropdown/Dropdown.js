import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';

class Dropdown extends Component {
  static propTypes = {
    menuItems: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    menuItemClass: PropTypes.string,
    disableUnderline: PropTypes.bool,
    selectBackground: PropTypes.string,
  }
  constructor(props){
    super(props);
    this.state = {
      menuItems:this.props.menuItems,
      onChange:this.props.onChange,
      value:this.props.value,
      name:this.props.name,
      className:this.props.className,
      menuItemClass:this.props.menuItemClass,
      disableUnderline:this.props.disableUnderline,
      selectBackground:this.props.selectBackground
    }
  }
  render(){
    const options = this.state.menuItems.map(item => (
      <MenuItem className={this.state.menuItemClass} value={item} key={item}>
        {item}
      </MenuItem>
    ));
    console.log("VALUE",this.state.value);
    return (
      <FormControl>
        <Select
          value={this.state.value || this.state.menuItems[0]}
          onChange={this.state.onChange}
          className={this.state.className}
          SelectDisplayProps={{style: {background: this.state.selectBackground}}}
          disableUnderline={this.state.disableUnderline}
          inputProps={{
            name:this.state.name,
            id: this.state.name,
          }}
        >
          {options}
        </Select>
      </FormControl>
    );
  };
  }

export default Dropdown;
