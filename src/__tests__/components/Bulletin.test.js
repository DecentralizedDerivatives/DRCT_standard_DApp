import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import Bulletin, {Bulletin as b} from '../../components/Bulletin';

describe('<Bulletin />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Bulletin store={initStore()} />
      ).dive().dive().dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
