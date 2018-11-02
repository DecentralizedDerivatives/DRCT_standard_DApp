import CreateContractFormContainer from '../../components/CreateContractFormContainer';
import CreateContractFormComponent from '../../components/CreateContractFormComponent';

describe('<CreateContractFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', async () => {
      const wrapper = shallow(
        <CreateContractFormContainer store={initStore()} />
      ).dive().dive().dive().dive();

      wrapper.find(CreateContractFormComponent).simulate('submit');

      expect(wrapper).toMatchSnapshot();
    });
  });
});
