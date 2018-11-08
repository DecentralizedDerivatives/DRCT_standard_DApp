import requireConnection from '../../components/requireConnection';

// TODO: increase coverage
describe('<requireConnection />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<requireConnection store={initStore()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
