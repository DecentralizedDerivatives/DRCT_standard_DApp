import React from 'react';
import { shallow } from 'enzyme';
import Root from '../Root';
import AppRouter from '../AppRouter';

describe('<AppRouter />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <AppRouter />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
