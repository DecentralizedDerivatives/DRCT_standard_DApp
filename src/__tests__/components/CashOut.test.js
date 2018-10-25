import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import CashOut from '../../components/CashOut';

describe('<CashOut />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <CashOut store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
