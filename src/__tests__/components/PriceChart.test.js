import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import PriceChart from '../../components/PriceChart';

describe('<PriceChart />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <PriceChart store={initStore()} />
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
