import InputText from '../../components/InputText';

function setup(overrides) {
  const store = initStore();

  const meta = { touched: true, error: 'required' };
  const props = { store, meta, ...overrides };

  const wrapper = shallow(<InputText {...props} />);

  return {
    wrapper,
  };
}

describe('<InputText />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
