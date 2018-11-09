// COMPLETE
import SendFundsFormContainer, {
  validate,
} from '../../components/SendFundsFormContainer';

function setup(overrides) {
  const store = initStore();

  const sendFunds = jest.fn();
  const props = { store, sendFunds, ...overrides };

  const wrapper = shallow(<SendFundsFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
    sendFunds,
  };
}

describe('<SendFundsFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles submit', () => {
    const { wrapper, sendFunds } = setup();

    wrapper.find('SendFundsFormComponent').simulate('submit');

    expect(sendFunds).toBeCalledTimes(1);
  });

  it('validates values', () => {
    const incorrect = {};
    const correct = { address: '0x000...', amount: '1', currency: 'ETH' };

    expect(validate(incorrect)).toMatchSnapshot();
    expect(validate(correct)).toMatchSnapshot();
  });
});
