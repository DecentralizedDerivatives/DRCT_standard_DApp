import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import Bulletin from '../../components/Bulletin';

describe('<Bulletin />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Bulletin store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
