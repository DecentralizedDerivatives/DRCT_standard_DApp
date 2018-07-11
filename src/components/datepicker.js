import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { HORIZONTAL_ORIENTATION } from 'react-dates/constants';
import 'react-dates/lib/css/_datepicker.css';

const defaultProps = {
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  showClearDate: false,
  showDefaultInputIcon: true,
  orientation: HORIZONTAL_ORIENTATION,
  horizontalMargin: 0,
  numberOfMonths: 2
};
export class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      focused: false
    };
  }

  handleDateChange = date => {
    this.setState({ date });
    this.props.change(this.props.input.name, date);
  };

  handleFocusChange = ({ focused }) => {
    this.setState({ focused });
  };

  render() {
    return (
      <div>
        <div>{this.props.label}</div>
        <SingleDatePicker
          id="start_date"
          date={this.state.date}
          onDateChange={this.handleDateChange}
          focused={this.state.focused}
          onFocusChange={this.handleFocusChange}
        />
      </div>
    );
  }
}

Datepicker.defaultProps = defaultProps;

export default Datepicker;
