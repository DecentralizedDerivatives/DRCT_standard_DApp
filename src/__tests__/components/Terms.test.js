import Terms from '../../components/Terms';

describe('<Terms />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Terms />);
    expect(wrapper).toMatchSnapshot();
  });
});
