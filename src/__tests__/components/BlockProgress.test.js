import BlockProgress from '../../components/BlockProgress';
import { setProcessing } from '../../actions/orderActions';

describe('<BlockProgress />', () => {
  it('renders the component', () => {
    const store = initStore();

    const wrapper = shallow(<BlockProgress store={store} />);

    // not processing
    expect(wrapper.dive()).toMatchSnapshot();

    store.dispatch(setProcessing(true));

    // processing
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
