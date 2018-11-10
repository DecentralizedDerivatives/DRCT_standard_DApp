import requireConnection from '../../components/requireConnection';
import { SET_CONNECTION_STATUS } from '../../actions/types';

class ChildComponent extends React.Component {
  render() {
    return <div />;
  }
}

const ComposedComponent = requireConnection(ChildComponent);

function setup(overrides) {
  const store = initStore();

  const history = { push: jest.fn() };

  const props = { store, history, ...overrides };

  const wrapper = shallow(<ComposedComponent {...props} />).dive();

  return {
    wrapper,
    history,
  };
}

describe('<requireConnection />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles state change', () => {
    const { wrapper } = setup();
    wrapper.setState({});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders verified, but not connected', () => {
    const store = initStore();

    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: false,
        network: 4,
        whiteListed: true,
        verified: true,
      },
    });

    const { wrapper, history } = setup({ store });

    expect(wrapper).toMatchSnapshot();
    expect(history.push).toBeCalledTimes(1);
  });
});
