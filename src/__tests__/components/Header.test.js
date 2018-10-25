import React from 'react';
import { shallow } from 'enzyme';
import { initStore } from '../../Root';
import Header from '../../components/Header';

describe('<Header />', () => {
  describe('render not connected', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Header isConnected={false} whiteListed={false} store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('render connected not whitelisted', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Header isConnected={true} whiteListed={false} store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('render connected and whitelisted', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <Header isConnected={true} whiteListed={true} store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
