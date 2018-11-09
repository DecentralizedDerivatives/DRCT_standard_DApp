import CashOutFormComponent from '../../components/CashOutFormComponent';

function setup(overrides) {
  const store = initStore();

  const handleSubmit = jest.fn();

  const props = { store, handleSubmit, ...overrides };

  const wrapper = shallow(<CashOutFormComponent {...props} />);

  return {
    wrapper,
  };
}

describe('<CashOutFormComponent />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
