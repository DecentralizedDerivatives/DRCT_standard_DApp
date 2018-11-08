import CashOutFormContainer from '../../components/CashOutFormContainer';

function setup(overrides) {
  const store = initStore();
  const props = { store, ...overrides };

  const wrapper = shallow(<CashOutFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<CashOutFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();

    wrapper.find('CashOutFormComponent').simulate('submit');

    expect(wrapper).toMatchSnapshot();
  });
});
