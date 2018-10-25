import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import requireConnection from '../../components/requireConnection';

describe('<requireConnection />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <requireConnection store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
