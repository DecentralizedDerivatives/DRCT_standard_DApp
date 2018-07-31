import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import CreateContractFormContainer from '../../components/CreateContractFormContainer';

describe('<CreateContractFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <CreateContractFormContainer />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
