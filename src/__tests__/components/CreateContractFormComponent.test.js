import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import CreateContractFormComponent from '../../components/CreateContractFormComponent';

describe('<CreateContractFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <CreateContractFormComponent />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
