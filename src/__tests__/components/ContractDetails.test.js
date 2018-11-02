import ContractDetails from '../../components/ContractDetails';

describe('<ContractDetails />', () => {
  describe('render()', () => {
    it('renders empty component', () => {
      const wrapper = shallow(
        <ContractDetails store={initStore()} />
      ).dive();

      expect(wrapper).toMatchSnapshot();
    });

    it('renders the component', () => {
      const wrapper = shallow(
        <ContractDetails store={initFixtureStore()} />
      ).dive();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
