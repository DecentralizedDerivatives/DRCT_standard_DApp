import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import BuyFormComponent from '../../components/BuyFormComponent';

describe('<BuyFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <BuyFormComponent />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
