import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import PriceChart from '../../components/PriceChart';

describe('<PriceChart />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <PriceChart />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
