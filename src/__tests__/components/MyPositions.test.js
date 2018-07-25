import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import MyPositions from '../../components/MyPositions';

describe('<MyPositions />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <MyPositions />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
