import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import MyTransactions from '../../components/MyTransactions';

describe('<MyTransactions />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <MyTransactions store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
