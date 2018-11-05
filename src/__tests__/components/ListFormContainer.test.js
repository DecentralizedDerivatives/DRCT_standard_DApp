import ListFormContainer, {
  validate,
} from '../../components/ListFormContainer';

describe('<ListFormContainer />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<ListFormContainer store={initFixtureStore()} />)
      .dive()
      .dive()
      .dive()
      .dive();

    wrapper.find('ListFormComponent').simulate('submit', {});

    expect(wrapper).toMatchSnapshot();
  });

  it('validates values', () => {
    const incorrect = {};
    const correct = { token: '0x000...', price: '1', tokenAmount: '1' };

    expect(validate(incorrect)).toMatchSnapshot();
    expect(validate(correct)).toMatchSnapshot();
  });
});
