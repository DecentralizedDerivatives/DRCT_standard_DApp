// COMPLETE
import Loading from '../../components/Loading';

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<Loading {...props} />);

  return {
    wrapper,
  };
}

describe('<Loading />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
