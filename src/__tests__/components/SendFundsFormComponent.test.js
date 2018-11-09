import SendFundsFormComponent from '../../components/SendFundsFormComponent';

function setup(overrides) {
  const store = initStore();

  const handleSubmit = jest.fn();
  const props = { store, handleSubmit, ...overrides };

  const wrapper = shallow(<SendFundsFormComponent {...props} />);

  return {
    wrapper,
  };
}

describe('<SendFundsFormComponent />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
