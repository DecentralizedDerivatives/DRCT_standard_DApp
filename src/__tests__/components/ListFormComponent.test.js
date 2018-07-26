import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import ListFormComponent from '../../components/ListFormComponent';

describe('<ListFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <ListFormComponent />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
