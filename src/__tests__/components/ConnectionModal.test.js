import ConnectionModal from '../../components/ConnectionModal';

function setup(overrides) {
  const store = initStore();
  const props = { store, ...overrides };

  const wrapper = shallow(<ConnectionModal {...props} />).dive();

  return {
    wrapper,
  };
}

describe('<ConnectionModal />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();

    wrapper.find('ModalFooter > button').simulate('click');
  });
});
