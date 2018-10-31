import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import OrderBook from '../../components/OrderBook';

describe('<OrderBook />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <OrderBook store={initStore()} />
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
