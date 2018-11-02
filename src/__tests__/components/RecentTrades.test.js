import RecentTrades from '../../components/RecentTrades';

describe('<RecentTrades />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const onRowClick = jest.fn();

      const wrapper = shallow(
        <RecentTrades store={initFixtureStore()} onRowClick={onRowClick} />
      ).dive();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
