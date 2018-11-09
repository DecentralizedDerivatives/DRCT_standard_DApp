import ListFormComponent from '../../components/ListFormComponent';

function setup(overrides) {
  const store = initStore();

  const handleSubmit = jest.fn();
  const props = { store, handleSubmit, ...overrides };

  const wrapper = shallow(<ListFormComponent {...props} />);

  return {
    wrapper,
  };
}

describe('<ListFormComponent />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
