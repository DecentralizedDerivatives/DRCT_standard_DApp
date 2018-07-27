import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import OrderBook from '../../components/OrderBook';

describe('<OrderBook />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <OrderBook />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
