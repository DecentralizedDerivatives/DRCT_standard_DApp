import CashOutFormContainer from '../../components/CashOutFormContainer';

describe('<CashOutFormContainer />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <CashOutFormContainer store={initStore()} />
      ).dive().dive().dive().dive();

      wrapper.find('CashOutFormComponent').simulate('submit');

      expect(wrapper).toMatchSnapshot();
    });
  });
});
