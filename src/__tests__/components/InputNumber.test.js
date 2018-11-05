import InputNumber from '../../components/InputNumber';

describe('<InputNumber />', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <InputNumber
        store={initStore()}
        input={{}}
        addonLabel={'label'}
        meta={{ touched: true, error: 'required' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
