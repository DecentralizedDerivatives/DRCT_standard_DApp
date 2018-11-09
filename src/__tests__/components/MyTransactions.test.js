// TODO: check
import MyTransactions from '../../components/MyTransactions';
import {
  SET_FETCH_IN_PROGRESS,
  SET_USER_TRANSACTIONS,
} from '../../actions/types';

function setup(overrides) {
  const store = initStore();
  const props = { store, ...overrides };

  const wrapper = shallow(<MyTransactions {...props} />).dive();

  return {
    wrapper,
  };
}

describe('<MyTransactions />', () => {
  it('renders the component', () => {
    const { wrapper } = setup({ store: initFixtureStore() });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const store = initFixtureStore();

    store.dispatch({
      type: SET_FETCH_IN_PROGRESS,
      payload: SET_USER_TRANSACTIONS,
    });

    const { wrapper } = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
