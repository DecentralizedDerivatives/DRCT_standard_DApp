import ApprovalFormContainer, {
  validate,
} from '../../components/ApprovalFormContainer';

describe('<ApprovalFormContainer />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<ApprovalFormContainer store={initStore()} />)
      .dive()
      .dive()
      .dive()
      .dive();

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
