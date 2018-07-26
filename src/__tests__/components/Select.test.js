import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import Select from '../../components/Select';

describe('<Select />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Select />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
