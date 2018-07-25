import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import MyPortfolio from '../../components/MyPortfolio';

describe('<MyPortfolio />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <MyPortfolio />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
