import ConnectionModal from '../../components/ConnectionModal';

describe('<ConnectionModal />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<ConnectionModal store={initStore()} />).dive();

    expect(wrapper).toMatchSnapshot();

    wrapper.find('ModalFooter > button').simulate('click');
  });
});
