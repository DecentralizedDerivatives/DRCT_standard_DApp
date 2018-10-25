import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import CashOutFormComponent from '../../components/CashOutFormComponent';

describe('<CashOutFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <CashOutFormComponent store={initStore()} handleSubmit={handleSubmit} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
