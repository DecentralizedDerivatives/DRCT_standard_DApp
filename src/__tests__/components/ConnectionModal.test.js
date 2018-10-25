import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';

import ConnectionModal from '../../components/ConnectionModal';

describe('<ConnectionModal />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <ConnectionModal store={initStore()} />
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
