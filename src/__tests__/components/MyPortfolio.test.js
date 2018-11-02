import MyPortfolio from '../../components/MyPortfolio';

describe('<MyPortfolio />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <MyPortfolio store={initFixtureStore()} />
      ).dive().dive().dive();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
