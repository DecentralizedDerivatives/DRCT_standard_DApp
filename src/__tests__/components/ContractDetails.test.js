import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';

import ContractDetails from '../../components/ContractDetails';

describe('<ContractDetails />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <ContractDetails />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
