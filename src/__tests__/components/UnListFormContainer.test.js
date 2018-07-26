import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import UnListFormContainer from '../../components/UnListFormContainer';

describe('<UnListFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <UnListFormContainer />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
