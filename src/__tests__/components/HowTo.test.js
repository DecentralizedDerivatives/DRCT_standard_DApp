import HowTo from '../../components/HowTo';

describe('<HowTo />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<HowTo />);
    expect(wrapper).toMatchSnapshot();
  });
});
