import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import ConnectionModal from '../../components/ConnectionModal';

describe('<ConnectionModal />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <ConnectionModal />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
