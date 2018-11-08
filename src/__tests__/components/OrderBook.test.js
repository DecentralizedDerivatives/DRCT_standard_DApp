import OrderBook from '../../components/OrderBook';
import { SET_FETCH_IN_PROGRESS, SET_ORDERBOOK } from '../../actions/types';

// TODO: setup
describe('<OrderBook />', () => {
  it('renders the component', () => {
    const onRowClick = jest.fn();
    const refreshPage = jest.fn();

    const wrapper = shallow(
      <OrderBook
        store={initFixtureStore()}
        onRowClick={onRowClick}
        refreshPage={refreshPage}
      />
    ).dive();

    wrapper
      .find('button[children="Buy"]')
      .first()
      .simulate('click', {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });

    wrapper
      .find('button[children="Unlist"]')
      .first()
      .simulate('click', {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });

    wrapper.setProps({ buyOrderTx: undefined });
    wrapper.setProps({ buyOrderTx: '0x000...' });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const onRowClick = jest.fn();

    const wrapper = shallow(
      <OrderBook store={initStore()} onRowClick={onRowClick} />
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading component', () => {
    const onRowClick = jest.fn();
    const store = initFixtureStore();

    store.dispatch({ type: SET_FETCH_IN_PROGRESS, payload: SET_ORDERBOOK });

    const wrapper = shallow(
      <OrderBook store={store} onRowClick={onRowClick} />
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('formats money', () => {
    const onRowClick = jest.fn();

    const wrapper = shallow(
      <OrderBook store={initStore()} onRowClick={onRowClick} />
    ).dive();

    expect(wrapper.instance().formatMoney()).toMatchSnapshot();
    expect(wrapper.instance().formatMoney(undefined, '--')).toMatchSnapshot();
    expect(wrapper.instance().formatMoney(-1)).toMatchSnapshot();
    expect(wrapper.instance().formatMoney(1)).toMatchSnapshot();
  });

  it('formats percentage', () => {
    const onRowClick = jest.fn();

    const wrapper = shallow(
      <OrderBook store={initStore()} onRowClick={onRowClick} />
    ).dive();

    expect(wrapper.instance().formatPercent()).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(undefined, '--')).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(-1)).toMatchSnapshot();
    expect(wrapper.instance().formatPercent(1)).toMatchSnapshot();
  });
});
