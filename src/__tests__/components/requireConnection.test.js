import requireConnection from '../../components/requireConnection';
import { SET_CONNECTION_STATUS } from '../../actions/types';

class ChildComponent extends React.Component {
  render() {
    return <div />;
  }
}

const ComposedComponent = requireConnection(ChildComponent);

describe('<requireConnection />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<ComposedComponent store={initStore()} />).dive();
    wrapper.setState({});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders verified, but not connected', () => {
    const store = initStore();
    const history = { push: jest.fn() };
    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: false,
        network: 4,
        whiteListed: true,
        verified: true,
      },
    });
    const wrapper = shallow(
      <ComposedComponent store={store} history={history} />
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
