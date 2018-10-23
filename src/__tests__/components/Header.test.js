import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../Root';
import Header from '../../components/Header';

describe('<Header />', () => {
  describe('render not connected', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Header isConnected={false} whiteListed={false} />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('render connected not whitelisted', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Header isConnected={true} whiteListed={false} />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('render connected and whitelisted', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Root>
          <Header isConnected={true} whiteListed={true} />
        </Root>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
