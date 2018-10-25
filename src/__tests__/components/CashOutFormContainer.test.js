import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import CashOutFormContainer from '../../components/CashOutFormContainer';

describe('<CashOutFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <CashOutFormContainer store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
