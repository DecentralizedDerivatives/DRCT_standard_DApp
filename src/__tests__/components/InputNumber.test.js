import InputNumber from '../../components/InputNumber';

describe('<InputNumber />', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <InputNumber store={initStore()} meta={{}} input={{}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
