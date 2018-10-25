import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import RecentTrades from '../../components/RecentTrades';

describe('<RecentTrades />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <RecentTrades store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
