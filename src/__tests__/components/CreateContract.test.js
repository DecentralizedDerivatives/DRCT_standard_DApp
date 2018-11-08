import CreateContract from '../../components/CreateContract';
import CreateContractFormContainer from '../../components/CreateContractFormContainer';
import { SendFundsFormContainer } from '../../components/SendFundsFormContainer';

function setup(overrides) {
  const store = initStore();
  const close = jest.fn();
  const props = { store, close, ...overrides };

  const wrapper = shallow(<CreateContract {...props} />).dive();

  return {
    wrapper,
    close,
  };
}

describe('<CreateContract />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders contract create error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ newContractCreateError: 'Error hapenned.' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders new contract', () => {
    const { wrapper } = setup();
    wrapper.setProps({ newContract: { address: '0x000...' } });
    expect(wrapper).toMatchSnapshot();
    wrapper.find('#send-funds > button').simulate('click');
  });

  it('renders funding error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ newContractFundsError: 'Error hapenned.' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders funding without close', () => {
    const { wrapper } = setup({ close: undefined });
    wrapper.setProps({ newContract: { funded: true } });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders funding', () => {
    const { wrapper, close } = setup();
    wrapper.setProps({ newContract: { funded: true } });
    expect(close).toBeCalledTimes(1);
  });

  it('handles events', () => {
    const { wrapper } = setup();
    wrapper.find(CreateContractFormContainer).prop('handleSkipCreate')(
      new Event('click')
    );
    wrapper.find(SendFundsFormContainer).prop('sendFunds')();
  });
});
