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
  };
}

describe('<SendFundsFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();

    wrapper.find('SendFundsFormComponent').simulate('submit');

    expect(wrapper).toMatchSnapshot();
  });

  it('validates values', () => {
    const incorrect = {};
    const correct = { address: '0x000...', amount: '1', currency: 'ETH' };

    expect(validate(incorrect)).toMatchSnapshot();
    expect(validate(correct)).toMatchSnapshot();
  });
});
