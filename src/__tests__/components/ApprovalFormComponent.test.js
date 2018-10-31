import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import ApprovalFormComponent from '../../components/ApprovalFormComponent';

describe('<ApprovalFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <ApprovalFormComponent store={initStore} handleSubmit={handleSubmit} selectOptions={[]} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
