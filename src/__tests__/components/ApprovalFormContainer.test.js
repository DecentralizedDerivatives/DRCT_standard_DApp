import ApprovalFormContainer from '../../components/ApprovalFormContainer';

describe('<ApprovalFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <ApprovalFormContainer store={initStore()} />
      ).dive().dive().dive().dive();

      wrapper.find('ApprovalFormComponent').simulate('submit');
      
      expect(wrapper).toMatchSnapshot();
    });
  });
});
