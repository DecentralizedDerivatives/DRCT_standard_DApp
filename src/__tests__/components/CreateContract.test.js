import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import CreateContract from '../../components/CreateContract';

describe('<CreateContract />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <CreateContract />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
