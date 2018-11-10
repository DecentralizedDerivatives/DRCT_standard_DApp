import OrderBook from '../../components/OrderBook';
import { SET_FETCH_IN_PROGRESS, SET_ORDERBOOK } from '../../actions/types';
import { sendBuyOrder, sendUnlistOrder } from '../../actions/orderActions';

jest.mock('../../actions/orderActions');
sendBuyOrder.mockImplementation(() => () => undefined);
sendUnlistOrder.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore();

  const onRowClick = jest.fn();
  const refreshPage = jest.fn();

  const props = { store, onRowClick, refreshPage, ...overrides };

  const wrapper = shallow(<OrderBook {...props} />).dive();
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
    refreshPage,
  };
}

describe('<OrderBook />', () => {
  it('renders the component', () => {
    const { wrapper } = setup({ store: initStore(FIXTURE) });
    expect(wrapper).toMatchSnapshot();
  });

  it('handle buy', () => {
    const { wrapper } = setup({ store: initStore(FIXTURE) });

    wrapper
      .find('button[children="Buy"]')
      .first()
      .simulate('click', {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });

    expect(sendBuyOrder).toBeCalledTimes(1);
  });

  it('handle unlist', () => {
    const { wrapper } = setup({ store: initStore(FIXTURE) });

    wrapper
      .find('button[children="Unlist"]')
      .first()
      .simulate('click', {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });

    expect(sendUnlistOrder).toBeCalledTimes(1);
  });

  it('handle empty props', () => {
    const { wrapper } = setup();
    wrapper.setProps({ buyOrderTx: undefined });
  });

  it('handle buy order', () => {
    const { wrapper, refreshPage } = setup();

    wrapper.setProps({ buyOrderTx: '0x000...' });

    expect(refreshPage).toBeCalledTimes(1);
  });

  it('renders empty component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const store = initStore(FIXTURE);

    store.dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK });

    const wrapper = setup({ store });
    expect(wrapper).toMatchSnapshot();
  });

  it('formats money', () => {
    const { instance } = setup();

    expect(instance.formatMoney()).toMatchSnapshot();
    expect(instance.formatMoney(undefined, '--')).toMatchSnapshot();
    expect(instance.formatMoney(-1)).toMatchSnapshot();
    expect(instance.formatMoney(1)).toMatchSnapshot();
  });

  it('formats percentage', () => {
    const { instance } = setup();

    expect(instance.formatPercent()).toMatchSnapshot();
    expect(instance.formatPercent(undefined, '--')).toMatchSnapshot();
    expect(instance.formatPercent(-1)).toMatchSnapshot();
    expect(instance.formatPercent(1)).toMatchSnapshot();
  });
});
