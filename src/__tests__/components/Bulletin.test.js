import Bulletin from '../../components/Bulletin';
import OrderBook from '../../components/OrderBook';
import List from '../../components/List';
import ContractDetails from '../../components/ContractDetails';
import {
  getContractDetails,
  getOrderBook,
  getRecentTrades,
} from '../../actions/contractActions';
import {
  getUserTokenPositions,
  getUserOrders,
  getUserAccount,
} from '../../actions/userActions';

jest.useFakeTimers();
jest.mock('../../ethereum');
jest.mock('../../actions/contractActions');
jest.mock('../../actions/userActions');
getUserAccount.mockImplementation(() => () => undefined);
getContractDetails.mockImplementation(() => () => undefined);
getOrderBook.mockImplementation(() => () => undefined);
getRecentTrades.mockImplementation(() => () => undefined);
getUserTokenPositions.mockImplementation(() => () => undefined);
getUserOrders.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<Bulletin {...props} />)
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<Bulletin />', () => {
  beforeEach(() => {
    getOrderBook.mockClear();
    getRecentTrades.mockClear();
  });

  it('renders empty component and unmounts', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
    expect(clearInterval).toBeCalledTimes(2);
  });

  it('renders the component', done => {
    const { wrapper } = setup({ store: initStore(FIXTURE) });

    setImmediate(() => {
      jest.runOnlyPendingTimers();

      expect(wrapper).toMatchSnapshot();

      // once on init, once on interval
      expect(getOrderBook).toBeCalledTimes(2);
      expect(getRecentTrades).toBeCalledTimes(2);

      expect(getUserOrders).toBeCalledTimes(1);
      expect(getUserTokenPositions).toBeCalledTimes(1);

      done();
    });
  });

  it('handles details', done => {
    const { wrapper } = setup({ store: initStore(FIXTURE) });

    wrapper
      .find(OrderBook)
      .simulate('rowClick', '0x000...', 'ETH/USD', '11/09/2018', {
        preventDefault: jest.fn(),
      });

    setImmediate(() => {
      // opened details
      expect(wrapper).toMatchSnapshot();
      expect(getContractDetails).toBeCalledTimes(1);

      // closed details
      wrapper.find(ContractDetails).prop('close')();
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  it('handles refresh', () => {
    const { wrapper } = setup();

    wrapper.find(List).prop('refreshPage')();

    expect(getOrderBook).toBeCalledTimes(1);
    expect(getRecentTrades).toBeCalledTimes(1);
  });
});
