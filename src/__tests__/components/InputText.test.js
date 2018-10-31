import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';

import InputText from '../../components/InputText';

describe('<InputText />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <InputText store={initStore()} meta={{}} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
