import CashOut from '../../components/CashOut';

describe('<CashOut />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const close = jest.fn();

      const wrapper = shallow(
        <CashOut store={initStore()} />
      ).dive();

      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({cashOutError: 'Error happened.', cashOutTx: undefined});
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({cashOutError: undefined, cashOutTx: '0x000...'});
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({close: close});
      wrapper.setProps({cashOutError: undefined, cashOutTx: '0x000...'});
      expect(close).toBeCalledTimes(1);

      wrapper.setProps({cashOutError: undefined, cashOutTx: undefined});
      expect(wrapper).toMatchSnapshot();
    });
  });
});
