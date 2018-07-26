import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import SendFundsFormContainer from '../../components/SendFundsFormContainer';

describe('<SendFundsFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <SendFundsFormContainer />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
