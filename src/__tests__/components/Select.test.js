import Select from '../../components/Select';

describe('<Select />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Select store={initStore()} meta={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
