import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';

import ContractDetails from '../../components/ContractDetails';

describe('<ContractDetails />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <ContractDetails store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
