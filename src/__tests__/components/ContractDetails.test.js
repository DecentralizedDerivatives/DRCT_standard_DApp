import ContractDetails from '../../components/ContractDetails';

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<ContractDetails {...props} />).dive();
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
  };
}

describe('<ContractDetails />', () => {
  it('renders empty component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the component', () => {
    const { wrapper } = setup({ store: initStore(FIXTURE) });
    expect(wrapper).toMatchSnapshot();
  });

  it('formats money', () => {
    const { instance } = setup();

    expect(instance.formatMoney()).toMatchSnapshot();
    expect(instance.formatMoney(undefined, '--')).toMatchSnapshot();
    expect(instance.formatMoney(-1)).toMatchSnapshot();
    expect(instance.formatMoney(1)).toMatchSnapshot();
  });

  it('formats percentage', () => {
    const { instance } = setup();

    expect(instance.formatPercent()).toMatchSnapshot();
    expect(instance.formatPercent(undefined, '--')).toMatchSnapshot();
    expect(instance.formatPercent(-1)).toMatchSnapshot();
    expect(instance.formatPercent(1)).toMatchSnapshot();
  });
});
