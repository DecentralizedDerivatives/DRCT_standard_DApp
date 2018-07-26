import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import Bulletin from '../../components/Bulletin';

describe('<Bulletin />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Bulletin />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
