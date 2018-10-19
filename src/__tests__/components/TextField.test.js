import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import TextField from '../../components/TextField';

describe('<TextField />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <TextField id='testId' name='testId' type='text' />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
