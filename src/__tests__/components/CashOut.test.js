// TODO: check
import CashOut from '../../components/CashOut';

function setup(overrides) {
  const store = initStore();
  const close = jest.fn();
  const props = { store, close, ...overrides };

  const wrapper = shallow(<CashOut {...props} />).dive();

  return {
    wrapper,
    close,
  };
}

describe('<CashOut />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ cashOutError: 'Error happened.' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders tx', () => {
    const { wrapper, close } = setup();
    wrapper.setProps({ cashOutTx: '0x000...' });
    expect(close).toBeCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders tx without close', () => {
    const { wrapper } = setup({ close: undefined });
    wrapper.setProps({ cashOutTx: '0x000...' });
    expect(wrapper).toMatchSnapshot();
  });

  it('handles setProps without values', () => {
    const { wrapper } = setup();
    wrapper.setProps({});
    expect(wrapper).toMatchSnapshot();
  });
});
