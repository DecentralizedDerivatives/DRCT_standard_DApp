import ListFormComponent from '../../components/ListFormComponent';

describe('<ListFormComponent />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <ListFormComponent store={initStore()} handleSubmit={handleSubmit} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
