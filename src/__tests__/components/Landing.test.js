import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';

import Landing from '../../components/Landing';

describe('<Landing />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Landing store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
