import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import MyPortfolio from '../../components/MyPortfolio';

describe('<MyPortfolio />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <MyPortfolio store={initStore()} />
      ).dive().dive().dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
