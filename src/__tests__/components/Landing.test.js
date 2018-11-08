import Landing from '../../components/Landing';
import { SET_CONNECTION_STATUS } from '../../actions/types';

// TODO: setup
describe('<Landing />', () => {
  it('renders the component', () => {
    const store = initFixtureStore();

    const wrapper = shallow(<Landing store={store} />);

    expect(wrapper.dive()).toMatchSnapshot();

    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: true,
        network: 4,
        whiteListed: false,
        verified: true,
      },
    });

    wrapper.update();
    expect(wrapper.dive()).toMatchSnapshot();

    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: true,
        network: 3,
        whiteListed: true,
        verified: true,
      },
    });

    wrapper.update();
    expect(wrapper.dive()).toMatchSnapshot();

    store.dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: false,
        network: 4,
        whiteListed: true,
        verified: true,
      },
    });

    wrapper.dive().setState({});

    expect(wrapper.dive()).toMatchSnapshot();
  });
});
