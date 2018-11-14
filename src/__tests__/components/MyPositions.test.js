import MyPositions from '../../components/MyPositions';
import { SET_USER_POSITIONS, SET_FETCH_IN_PROGRESS } from '../../actions/types';

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<MyPositions {...props} />).dive();
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
  };
}

describe('<MyPositions />', () => {
  it('renders the component', () => {
    const { wrapper } = setup({ store: initStore(FIXTURE) });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const store = initStore(FIXTURE);

    store.dispatch({
      type: SET_FETCH_IN_PROGRESS,
      payload: SET_USER_POSITIONS,
    });

    const { wrapper } = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('formats percentage', () => {
    const { instance } = setup();

    expect(instance.formatPercent()).toMatchSnapshot();
    expect(instance.formatPercent(undefined, '--')).toMatchSnapshot();
    expect(instance.formatPercent(-1)).toMatchSnapshot();
    expect(instance.formatPercent(1)).toMatchSnapshot();
  });
});
