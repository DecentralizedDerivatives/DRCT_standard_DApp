import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import RecentTrades from '../../components/RecentTrades';

describe('<RecentTrades />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <RecentTrades />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
