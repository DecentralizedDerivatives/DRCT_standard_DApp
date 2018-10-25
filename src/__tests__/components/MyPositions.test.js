import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import MyPositions from '../../components/MyPositions';

describe('<MyPositions />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <MyPositions store={initStore()} />
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
