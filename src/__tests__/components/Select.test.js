import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import Select from '../../components/Select';

describe('<Select />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Select store={initStore()} meta={{}} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
