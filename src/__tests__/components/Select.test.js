import Select from '../../components/Select';

function setup(overrides) {
  const meta = { touched: true, error: 'required' };
  const options = { option1: 'Option 1' };

  const props = { meta, options, ...overrides };

  const wrapper = shallow(<Select {...props} />);

  return {
    wrapper,
  };
}

describe('<Select />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const { wrapper } = setup({ options: undefined });
    expect(wrapper).toMatchSnapshot();
  });
});
