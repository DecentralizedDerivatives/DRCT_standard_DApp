import ContractDetails from '../../components/ContractDetails';

describe('<ContractDetails />', () => {
  it('renders empty component', () => {
    const wrapper = shallow(<ContractDetails store={initStore()} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders the component', () => {
    const wrapper = shallow(
      <ContractDetails store={initFixtureStore()} />
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('formats money', () => {
    const wrapper = shallow(<ContractDetails store={initStore()} />).dive();

    expect(wrapper.instance().formatMoney()).toMatchSnapshot();
    expect(wrapper.instance().formatMoney(undefined, '--')).toMatchSnapshot();
    expect(wrapper.instance().formatMoney(-1)).toMatchSnapshot();
    expect(wrapper.instance().formatMoney(1)).toMatchSnapshot();
  });

  it('formats percentage', () => {
    const wrapper = shallow(<ContractDetails store={initStore()} />).dive();

    expect(wrapper.instance().formatPercent()).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(undefined, '--')).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(-1)).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(1)).toMatchSnapshot();
  });
});
