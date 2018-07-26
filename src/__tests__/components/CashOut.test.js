import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import CashOut from '../../components/CashOut';

describe('<CashOut />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <CashOut />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
