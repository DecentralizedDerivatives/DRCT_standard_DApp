import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import BlockProgress from '../../components/BlockProgress';

describe('<BlockProgress />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <BlockProgress store={initStore()} />
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
