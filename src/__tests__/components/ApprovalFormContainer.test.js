import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import ApprovalFormContainer from '../../components/ApprovalFormContainer';

describe('<ApprovalFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <ApprovalFormContainer />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
