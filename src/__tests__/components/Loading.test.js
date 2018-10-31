import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import Loading from '../../components/Loading';

describe('<Loading />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Loading store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
