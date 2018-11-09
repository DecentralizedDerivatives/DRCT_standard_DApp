// COMPLETE
import Terms from '../../components/Terms';

function setup(overrides) {
  const props = { ...overrides };

  const wrapper = shallow(<Terms {...props} />);

  return {
    wrapper,
  };
}

describe('<Terms />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
