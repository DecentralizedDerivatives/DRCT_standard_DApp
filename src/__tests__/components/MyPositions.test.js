import MyPositions from '../../components/MyPositions';

describe('<MyPositions />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<MyPositions store={initFixtureStore()} />).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
