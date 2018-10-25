import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import ApprovalFormContainer from '../../components/ApprovalFormContainer';

describe('<ApprovalFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <ApprovalFormContainer store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
