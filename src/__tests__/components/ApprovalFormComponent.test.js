// COMPLETE
import ApprovalFormComponent from '../../components/ApprovalFormComponent';

function setup(overrides) {
  const store = initFixtureStore();

  const handleSubmit = jest.fn();
  const selectOptions = store.getState().user.userTokens;

  const props = { store, handleSubmit, selectOptions, ...overrides };

  const wrapper = shallow(<ApprovalFormComponent {...props} />);

  return {
    wrapper,
  };
}

describe('<ApprovalFormComponent />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
