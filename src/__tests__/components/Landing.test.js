import Landing from '../../components/Landing';
import { SET_CONNECTION_STATUS } from '../../actions/types';

function setup(overrides) {
  const store = initFixtureStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<Landing {...props} />).dive();

  return {
    wrapper,
  };
}

describe('<Landing />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders not whitelisted', () => {
    const store = initFixtureStore();

    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: true,
        network: 4,
        whiteListed: false,
        verified: true,
      },
    });

    const { wrapper } = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with wrong network id', () => {
    const store = initFixtureStore();

    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: true,
        network: 3,
        whiteListed: true,
        verified: true,
      },
    });

    const { wrapper } = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders not connected', () => {
    const store = initFixtureStore();

    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: false,
        network: 4,
        whiteListed: true,
        verified: true,
      },
    });

    const { wrapper } = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });

  it('handles state update', () => {
    const { wrapper } = setup();
    wrapper.setState({});
    expect(wrapper).toMatchSnapshot();
  });
});
