import ListFormContainer, {
  validate,
} from '../../components/ListFormContainer';

function setup(overrides) {
  const store = initFixtureStore();
  const props = { store, ...overrides };

  const wrapper = shallow(<ListFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<ListFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();

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
