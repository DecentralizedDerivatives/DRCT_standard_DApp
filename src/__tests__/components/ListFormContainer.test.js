import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import ListFormContainer from '../../components/ListFormContainer';

describe('<ListFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <ListFormContainer />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
