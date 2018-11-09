import AppRouter from '../AppRouter';

describe('<AppRouter />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<AppRouter store={initStore()} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders the component with data', () => {
    const wrapper = shallow(<AppRouter store={initStore(FIXTURE)} />).dive();

    wrapper.setState({});

    wrapper.find('Header').prop('showTerms')();
    wrapper.find('Terms').prop('close')();

    expect(wrapper).toMatchSnapshot();
  });
});
