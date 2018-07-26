import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import SendFundsFormComponent from '../../components/SendFundsFormComponent';

describe('<SendFundsFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <SendFundsFormComponent />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
