import PriceChart from '../../components/PriceChart';

describe('<PriceChart />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<PriceChart store={initStore()} />).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
