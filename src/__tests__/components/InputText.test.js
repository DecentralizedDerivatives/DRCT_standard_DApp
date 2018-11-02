import InputText from '../../components/InputText';

describe('<InputText />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <InputText store={initStore()} meta={{}} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
