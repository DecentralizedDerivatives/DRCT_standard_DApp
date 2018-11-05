import SendFundsFormComponent from '../../components/SendFundsFormComponent';

describe('<SendFundsFormComponent />', () => {
  it('renders the component', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <SendFundsFormComponent store={initStore()} handleSubmit={handleSubmit} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
