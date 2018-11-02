import requireConnection from '../../components/requireConnection';

describe('<requireConnection />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <requireConnection store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
