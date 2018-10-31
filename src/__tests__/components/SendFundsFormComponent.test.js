import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import SendFundsFormComponent from '../../components/SendFundsFormComponent';

describe('<SendFundsFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <SendFundsFormComponent store={initStore()} handleSubmit={handleSubmit} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
