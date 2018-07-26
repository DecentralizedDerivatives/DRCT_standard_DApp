import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import requireConnection from '../../components/requireConnection';

describe('<requireConnection />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <requireConnection />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
