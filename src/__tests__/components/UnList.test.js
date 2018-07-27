import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import UnList from '../../components/UnList';

describe('<UnList />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <UnList />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
