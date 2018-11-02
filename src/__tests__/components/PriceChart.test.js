import PriceChart from '../../components/PriceChart';

describe('<PriceChart />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <PriceChart store={initStore()} />
      ).dive();

      expect(wrapper).toMatchSnapshot();
    });
  });
});
