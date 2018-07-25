import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import ApprovalFormComponent from '../../components/ApprovalFormComponent';

describe('<ApprovalFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <ApprovalFormComponent />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
