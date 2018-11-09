import BlockProgress from '../../components/BlockProgress';
import { setProcessing } from '../../actions/orderActions';

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<BlockProgress {...props} />).dive();

  return {
    wrapper,
  };
}

describe('<BlockProgress />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders processing component', () => {
    const store = initStore();
    store.dispatch(setProcessing(true));

    const { wrapper } = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });
});
