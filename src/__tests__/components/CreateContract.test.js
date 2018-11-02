import CreateContract from '../../components/CreateContract';
import CreateContractFormContainer from '../../components/CreateContractFormContainer';
import { SendFundsFormContainer } from '../../components/SendFundsFormContainer';

describe('<CreateContract />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const close = jest.fn();

      const wrapper = shallow(
        <CreateContract store={initStore()} />
      ).dive();

      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({newContractCreateError: 'Error hapenned.'});
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({newContractCreateError: undefined});

      wrapper.setProps({newContract: {address: '0x000...'}});
      expect(wrapper).toMatchSnapshot();
      wrapper.find('#send-funds > button').simulate('click');
      wrapper.setProps({newContract: {address: undefined}});

      wrapper.setProps({newContractFundsError: 'Error hapenned.'});
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({newContractFundsError: undefined});

      wrapper.setProps({newContract: {funded: true}});
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({newContract: {funded: undefined}});

      wrapper.setProps({close: close});
      wrapper.setProps({newContract: {funded: true}});
      expect(close).toBeCalledTimes(1);

      wrapper.find(CreateContractFormContainer).prop('handleSkipCreate')(new Event('click'));

      wrapper.find(SendFundsFormContainer).prop('sendFunds')();
    });
  });
});
