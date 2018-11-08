import CreateContractFormComponent from '../../components/CreateContractFormComponent';

function setup(overrides) {
  const store = initStore();
  const handleSubmit = jest.fn();
  const props = { store, handleSubmit, ...overrides };

  const wrapper = shallow(<CreateContractFormComponent {...props} />);

  return {
    wrapper,
  };
}

describe('<CreateContractFormComponent />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
