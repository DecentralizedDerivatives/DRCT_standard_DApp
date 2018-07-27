import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import InputNumber from '../../components/InputNumber';

describe('<InputNumber />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <InputNumber />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
