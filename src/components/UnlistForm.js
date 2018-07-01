import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';
import 'react-widgets/dist/css/react-widgets.css';

let UnlistForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    onChange,
    value,
    dropDownData,
    dropDownValue
  } = props;

  const renderDropdownList = ({ input, data, valueField, textField }) => (
    <DropdownList
      {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange}
    />
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Buy Order</label>
        <InputGroup>
          <label>Select Order</label>
          <Field
            name="unlistOrderID"
            component={renderDropdownList}
            data={dropDownData}
            valueField={dropDownValue}
            textField="orderID"
          />
        </InputGroup>

        <br />

        <InputGroup>
          <Field
            label="Or enter Order ID:"
            name="unlistOrderID"
            component={InputNumber}
            type="number"
            onChange={onChange}
          />
        </InputGroup>

        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset Values
          </button>
        </div>
      </div>
    </form>
  );
};

UnlistForm = reduxForm({
  form: 'unlist',
  initialValues: {
    unlistOrderID: ''
  }
})(UnlistForm);

export default UnlistForm;
