import CreateContract from '../../components/CreateContract';
import CreateContractFormContainer from '../../components/CreateContractFormContainer';
import { SendFundsFormContainer } from '../../components/SendFundsFormContainer';
import { sendSendFundsOrder } from '../../actions/orderActions';

jest.mock('../../actions/orderActions');
sendSendFundsOrder.mockImplementation(() => () => undefined);

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
  beforeEach(() => {
    sendSendFundsOrder.mockClear();
  });

  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders contract create error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ newContractCreateError: 'Error hapenned.' });
    expect(wrapper).toMatchSnapshot();
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

  it('handles empty setProps', () => {
    const { wrapper } = setup();
    wrapper.setProps({});
  });

  it('renders new contract', () => {
    const { wrapper } = setup();
    wrapper.setProps({ newContract: { address: '0x000...' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('handles send funds', () => {
    const { wrapper } = setup();
    wrapper.setProps({ newContract: { address: '0x000...' } });
    wrapper.find('#send-funds > button').simulate('click');
    expect(sendSendFundsOrder).toBeCalledTimes(1);
  });

  it('handles send funds directly', () => {
    const { wrapper } = setup();

    // open send funds
    wrapper.find(CreateContractFormContainer).prop('handleSkipCreate')({
      preventDefault: jest.fn(),
    });
    expect(wrapper).toMatchSnapshot();

    // send funds
    wrapper.find(SendFundsFormContainer).prop('sendFunds')();
    expect(sendSendFundsOrder).toBeCalledTimes(1);
  });
});
