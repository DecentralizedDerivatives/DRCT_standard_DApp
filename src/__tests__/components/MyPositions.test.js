import MyPositions from '../../components/MyPositions';

describe('<MyPositions />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <MyPositions store={initFixtureStore()} />
      ).dive();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
