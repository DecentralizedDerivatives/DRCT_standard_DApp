import MyTransactions from '../../components/MyTransactions';
import {
  SET_FETCH_IN_PROGRESS,
  SET_USER_TRANSACTIONS,
} from '../../actions/types';

describe('<MyTransactions />', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <MyTransactions store={initFixtureStore()} />
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const store = initFixtureStore();
    
    store.dispatch({
      type: SET_FETCH_IN_PROGRESS,
      payload: SET_USER_TRANSACTIONS,
    });

    const wrapper = shallow(<MyTransactions store={store} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const wrapper = shallow(<MyTransactions store={initStore()} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
