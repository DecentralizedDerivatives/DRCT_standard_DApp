import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import List from '../../components/List';

describe('<List />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <List />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
