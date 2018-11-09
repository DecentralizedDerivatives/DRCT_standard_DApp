// COMPLETE
import InputNumber from '../../components/InputNumber';

function setup(overrides) {
  const store = initStore();

  const input = {};
  const addonLabel = 'label';
  const meta = { touched: true, error: 'required' };
  const props = { store, input, addonLabel, meta, ...overrides };

  const wrapper = shallow(<InputNumber {...props} />);

  return {
    wrapper,
  };
}

describe('<InputNumber />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
