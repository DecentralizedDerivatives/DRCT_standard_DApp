import OrderBook from '../../components/OrderBook';

describe('<OrderBook />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const onRowClick = jest.fn();

      const wrapper = shallow(
        <OrderBook store={initFixtureStore()} onRowClick={onRowClick} />
      ).dive();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
