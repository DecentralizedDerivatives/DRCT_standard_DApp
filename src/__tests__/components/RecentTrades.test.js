import RecentTrades from '../../components/RecentTrades';

describe('<RecentTrades />', () => {
  it('renders the component', () => {
    const onRowClick = jest.fn();

    const wrapper = shallow(
      <RecentTrades store={initFixtureStore()} onRowClick={onRowClick} />
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
