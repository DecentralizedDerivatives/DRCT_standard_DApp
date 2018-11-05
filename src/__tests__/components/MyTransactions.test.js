import MyTransactions from '../../components/MyTransactions';

describe('<MyTransactions />', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <MyTransactions store={initFixtureStore()} />
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
