import SendFundsFormContainer from '../../components/SendFundsFormContainer';

describe('<SendFundsFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <SendFundsFormContainer store={initStore()} />
      ).dive().dive().dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
