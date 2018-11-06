import MyPositions from '../../components/MyPositions';
import { SET_USER_POSITIONS, SET_FETCH_IN_PROGRESS } from '../../actions/types';

describe('<MyPositions />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<MyPositions store={initFixtureStore()} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const store = initFixtureStore();

    store.dispatch({
      type: SET_FETCH_IN_PROGRESS,
      payload: SET_USER_POSITIONS,
    });

    const wrapper = shallow(<MyPositions store={store} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const wrapper = shallow(<MyPositions store={initStore()} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('formats percentage', () => {
    const wrapper = shallow(<MyPositions store={initStore()} />).dive();

    expect(wrapper.instance().formatPercent()).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(undefined, '--')).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(-1)).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(1)).toMatchSnapshot();
  });
});
