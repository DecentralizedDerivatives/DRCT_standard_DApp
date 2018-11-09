import RecentTrades from '../../components/RecentTrades';
import { SET_FETCH_IN_PROGRESS, SET_RECENT_TRADES } from '../../actions/types';

function setup(overrides) {
  const store = initFixtureStore();

  const onRowClick = jest.fn();
  const props = { store, onRowClick, ...overrides };

  const wrapper = shallow(<RecentTrades {...props} />).dive();

  return {
    wrapper,
  };
}

describe('<RecentTrades />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const store = initFixtureStore();

    store.dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_RECENT_TRADES });

    const { wrapper } = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });
});
