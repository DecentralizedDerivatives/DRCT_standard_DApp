import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import Landing from '../../components/Landing';

describe('<Landing />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Landing />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
