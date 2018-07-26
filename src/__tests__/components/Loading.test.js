import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import Loading from '../../components/Loading';

describe('<Loading />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Loading />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
