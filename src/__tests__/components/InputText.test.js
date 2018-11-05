import InputText from '../../components/InputText';

describe('<InputText />', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <InputText
        store={initStore()}
        meta={{ touched: true, error: 'required' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
