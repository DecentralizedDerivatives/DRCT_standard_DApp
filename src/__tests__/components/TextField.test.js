import TextField from '../../components/TextField';

describe('<TextField />', () => {
  describe('render()', () => {
    it('renders the component', () => {
      const wrapper = shallow(
        <TextField id='testId' name='testId' type='text' store={initStore()} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
