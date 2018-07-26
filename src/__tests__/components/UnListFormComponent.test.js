import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import UnListFormComponent from '../../components/UnListFormComponent';

describe('<UnListFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <UnListFormComponent />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
