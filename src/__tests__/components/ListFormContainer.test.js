import ListFormContainer from '../../components/ListFormContainer';

describe('<ListFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <ListFormContainer store={initFixtureStore()} />
      ).dive().dive().dive().dive();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
