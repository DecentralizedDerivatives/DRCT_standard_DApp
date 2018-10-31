import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import ListFormContainer from '../../components/ListFormContainer';

describe('<ListFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <ListFormContainer store={initStore()} />
      ).dive().dive().dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
