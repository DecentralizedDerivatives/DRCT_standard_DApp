import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import InputText from '../../components/InputText';

describe('<InputText />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <InputText />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
