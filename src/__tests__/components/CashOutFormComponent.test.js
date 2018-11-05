import CashOutFormComponent from '../../components/CashOutFormComponent';

describe('<CashOutFormComponent />', () => {
  it('renders the component', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <CashOutFormComponent store={initStore()} handleSubmit={handleSubmit} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
