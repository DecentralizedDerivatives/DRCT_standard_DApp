import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import CashOutFormComponent from '../../components/CashOutFormComponent';

describe('<CashOutFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <CashOutFormComponent />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
