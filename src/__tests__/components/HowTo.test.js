// COMPLETE
import HowTo from '../../components/HowTo';

function setup(overrides) {
  const props = { ...overrides };

  const wrapper = shallow(<HowTo {...props} />);

  return {
    wrapper,
  };
}

describe('<HowTo />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
