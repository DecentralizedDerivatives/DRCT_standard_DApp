import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import CreateContract from '../../components/CreateContract';

describe('<CreateContract />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <CreateContract store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
