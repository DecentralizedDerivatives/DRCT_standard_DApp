import RecentTrades from '../../components/RecentTrades';
import { SET_FETCH_IN_PROGRESS, SET_RECENT_TRADES } from '../../actions/types';

describe('<RecentTrades />', () => {
  it('renders the component', () => {
    const onRowClick = jest.fn();

    const wrapper = shallow(
      <RecentTrades store={initFixtureStore()} onRowClick={onRowClick} />
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const onRowClick = jest.fn();
    const store = initFixtureStore();

    store.dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_RECENT_TRADES });

    const wrapper = shallow(
      <RecentTrades store={store} onRowClick={onRowClick} />
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
