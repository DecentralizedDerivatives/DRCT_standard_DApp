import InputNumber from '../../components/InputNumber';

describe('<InputNumber />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <InputNumber store={initStore()} meta={{}} input={{}} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
