import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import CreateContractFormContainer from '../../components/CreateContractFormContainer';

describe('<CreateContractFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <CreateContractFormContainer store={initStore()} />
      ).dive().dive().dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
