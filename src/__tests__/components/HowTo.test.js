import React from 'react';
import { shallow } from 'enzyme';

import HowTo from '../../components/HowTo';

describe('<HowTo />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(<HowTo />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
