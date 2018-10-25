import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';

import List from '../../components/List';

describe('<List />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <List store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
