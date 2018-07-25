import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import Header from '../../components/Header';

describe('<Header />', () => {
  describe('render()', () => {
    xit('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Header />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
