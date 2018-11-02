import ConnectionModal from '../../components/ConnectionModal';

describe('<ConnectionModal />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <ConnectionModal store={initStore()} />
      ).dive();

      expect(wrapper).toMatchSnapshot();

      wrapper.find('ModalFooter > button').simulate('click');
    });
  });
});
