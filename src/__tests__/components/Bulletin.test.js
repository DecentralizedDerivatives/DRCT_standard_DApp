import Bulletin from '../../components/Bulletin';
import OrderBook from '../../components/OrderBook';

describe('<Bulletin />', () => {
  describe('render()', () => {
    it('renders empty component', () => {
      const wrapper = shallow(
        <Bulletin store={initStore()} />
      ).dive().dive().dive();

      expect(wrapper).toMatchSnapshot();
    });

    it('renders the component', async () => {
      const wrapper = shallow(
        <Bulletin store={initFixtureStore()} />
      ).dive().dive().dive();

      expect(wrapper).toMatchSnapshot();

      wrapper.find(OrderBook).simulate('RowClick');

      wrapper.unmount();
    });
  });
});
