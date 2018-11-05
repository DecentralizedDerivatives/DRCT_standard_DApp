import Loading from '../../components/Loading';

describe('<Loading />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Loading store={initStore()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
