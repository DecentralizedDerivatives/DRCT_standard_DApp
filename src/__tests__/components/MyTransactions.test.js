import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import MyTransactions from '../../components/MyTransactions';

describe('<MyTransactions />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <MyTransactions />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
