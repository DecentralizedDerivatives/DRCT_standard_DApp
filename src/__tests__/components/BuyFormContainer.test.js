import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import BuyFormContainer from '../../components/BuyFormContainer';

describe('<BuyFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <BuyFormContainer />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
