import ApprovalFormContainer, {
  validate,
} from '../../components/ApprovalFormContainer';

function setup(overrides) {
  const store = initStore();
  const props = { store, ...overrides };

  const wrapper = shallow(<ApprovalFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<ApprovalFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();

    wrapper.find('ApprovalFormComponent').simulate('submit');

    expect(wrapper).toMatchSnapshot();
  });

  it('validates values', () => {
    const incorrect = {};
    const correct = { token: '0x000...', tokenAmount: '1' };

    expect(validate(incorrect)).toMatchSnapshot();
    expect(validate(correct)).toMatchSnapshot();
  });
});
