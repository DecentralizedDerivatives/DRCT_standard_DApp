// COMPLETE
import TextField from '../../components/TextField';

function setup(overrides) {
  const store = initStore();

  const id = 'testId';
  const name = 'testName';
  const type = 'text';
  const meta = { touched: true, error: 'required' };

  const props = { store, id, name, type, meta, ...overrides };

  const wrapper = shallow(<TextField {...props} />);

  return {
    wrapper,
  };
}

describe('<TextField />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
