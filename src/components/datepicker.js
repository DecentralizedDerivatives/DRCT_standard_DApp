import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

export class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      focused: false
    };
  }

  changeActiveDateWidget = () => {
    this.setState({
      activeDateWidget: !this.state.activeDateWidget
    });
  };

  handleDateChange = date => {
    this.setState({ date });
    this.props.change(this.props.input.name, date);
  };

  render() {
    return (
      <div>
        <div>{this.props.label}</div>
        {/* <SingleDatePicker
          date={this.state.date}
          onDateChange={this.handleDateChange}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
          showClearDate={true}
          numberOfMonths={1}
        /> */}
      </div>
    );
  }
}

export default Datepicker;
