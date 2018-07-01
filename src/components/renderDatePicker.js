import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import dateFnsLocalizer, { defaultFormats } from 'react-widgets-date-fns';
import locales from 'date-fns/locale';

export default (renderDatePicker = ({
  input: { onChange, value },
  showTime
}) => {
  const formats = Object.assign(defaultFormats, { default: 'DD MMM YYYY' });
  dateFnsLocalizer({ formats, locales });

  return (
    <DateTimePicker
      onChange={onChange}
      format="DD MM YYYY"
      time={showTime}
      value={!value ? null : new Date(value)}
    />
  );
});
