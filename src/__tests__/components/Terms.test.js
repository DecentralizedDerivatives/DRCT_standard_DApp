import React from 'react';
import { shallow } from 'enzyme';

import Terms from '../../components/Terms';

describe('<Terms />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(<Terms />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
