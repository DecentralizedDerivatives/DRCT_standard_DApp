import Select from '../../components/Select';

describe('<Select />', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <Select
        meta={{ touched: true, error: 'required' }}
        options={{ option1: 'Option 1' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const wrapper = shallow(
      <Select
        meta={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
