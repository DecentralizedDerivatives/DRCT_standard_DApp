import SendFundsFormContainer, {
  validate,
} from '../../components/SendFundsFormContainer';

describe('<SendFundsFormContainer />', () => {
  it('renders the component', () => {
    const sendFunds = jest.fn();
    const wrapper = shallow(
      <SendFundsFormContainer store={initStore()} sendFunds={sendFunds} />
    )
      .dive()
      .dive()
      .dive()
      .dive();

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
