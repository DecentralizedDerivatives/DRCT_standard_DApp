import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import { InputGroup } from 'reactstrap';
import 'react-widgets/dist/css/react-widgets.css';

let ListForm = props => {
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
          <label>Enter the price in ETH, e.g. '0.1'</label>
          <Field
            name="listOrderPrice"
            component="input"
            type="number"
            placeholder="list price"
            step="0.01"
          />
          <InputGroupAddon addonType="append">ETH</InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <label>Amount of Token</label>
          <Field
            name="listTokenAmt"
            component="input"
            type="number"
            placeholder="amount of token to sell"
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
  form: 'list'
})(ListForm);

export default ListForm;
