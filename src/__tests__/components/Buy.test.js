import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import Buy from '../../components/Buy';

describe('<Buy />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Buy />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
