import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import CashOutFormContainer from '../../components/CashOutFormContainer';

describe('<CashOutFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <CashOutFormContainer />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
