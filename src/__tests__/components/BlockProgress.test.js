import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import BlockProgress from '../../components/BlockProgress';

describe('<BlockProgress />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <BlockProgress />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
