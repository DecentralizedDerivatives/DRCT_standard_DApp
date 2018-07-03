import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import { InputGroup } from 'reactstrap';
import InputNumber from './InputNumber';
import 'react-widgets/dist/css/react-widgets.css';

// Use named export for unconnected component for testing
export let ListForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    onChange,
    dropDownData
  } = props;

  const renderDropdownList = ({ input, data, valueField, textField }) => (
    <DropdownList
      {...input}
      data={data}
      textField={textField}
      onChange={input.onChange}
    />
  );

  const validateListOrderPrice = value => {
    if (!value) {
      return 'Must enter a value';
    } else if (value < 0.1) {
      return 'Must be at least 0.1';
    } else return null;
  };

  const validateNotEmpty = value => (!value ? 'Must enter a value' : null);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>List Order</label>
        <InputGroup>
          <label>Select Token</label>
          <Field
            name="listOrderToken"
            component={renderDropdownList}
            data={dropDownData}
            textField="listOrderToken"
          />
        </InputGroup>

        <br />
        <InputGroup>
          <Field
            label="Enter price in ETH"
            name="listOrderPrice"
            component={InputNumber}
            type="number"
            step="0.01"
            validate={validateListOrderPrice}
          />
          <InputGroupAddon addonType="append">ETH</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <label>Amount of Token</label>
          <Field
            label="Amount of Token"
            name="listTokenAmt"
            component={InputNumber}
            type="number"
            validate={validateNotEmpty}
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

ListForm = reduxForm({
  form: 'list',
  initialValues: {
    listOrderPrice: 0.1,
    listTokenAmt: 0
  }
})(ListForm);

export default ListForm;
