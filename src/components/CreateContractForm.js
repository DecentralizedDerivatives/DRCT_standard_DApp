import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import { InputGroup, InputGroupAddon } from 'reactstrap';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker';
// import moment from 'moment';
// import momentLocaliser from 'react-widgets/lib/util/localizers';
import InputNumber from './InputNumber';
import 'react-widgets/dist/css/react-widgets.css';

// momentLocaliser(moment);

const renderDatePicker = () => <input type="date" />;

let CreateContractForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const durations = ['One week'];
  const currencies = ['BTC/USD'];

  const validateCreateContractAmount = value => {
    if (!value) {
      return 'Must enter a value';
    } else if (value < 0.1) {
      return 'Must be at least 0.1';
    } else return null;
  };

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
        <label>Create Contract</label>
        <InputGroup>
          <label>Select Duration</label>
          <Field
            name="createContractDuration"
            component={renderDropdownList}
            data={durations}
            textField="createContractDuration"
          />
        </InputGroup>

        <InputGroup>
          <label>Select Currency</label>
          <Field
            name="createContractCurrency"
            component={renderDropdownList}
            data={currencies}
            textField="createContractCurrency"
          />
        </InputGroup>
        <InputGroup>
          <label>Start Date</label>
          <Field name="startDate" component={renderDatePicker} />
        </InputGroup>

        <InputGroup>
          <label>Amount of Ether</label>
          <Field
            label="Amount of Ether"
            name="createContractAmount"
            component={InputNumber}
            type="number"
            step="0.1"
            validate={validateCreateContractAmount}
          />
          <InputGroupAddon addonType="append">ETH</InputGroupAddon>
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

CreateContractForm = reduxForm({
  form: 'createcontract',
  initialValues: {
    createContractAmount: 0.1
  }
})(CreateContractForm);

export default CreateContractForm;
