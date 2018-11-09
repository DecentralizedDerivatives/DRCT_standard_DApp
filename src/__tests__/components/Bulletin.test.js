// TODO: setup
import Bulletin from '../../components/Bulletin';
import OrderBook from '../../components/OrderBook';
import List from '../../components/List';
import ContractDetails from '../../components/ContractDetails';

jest.useFakeTimers();

jest.mock('../../ethereum');

describe('<Bulletin />', () => {
  it('renders empty component', () => {
    const wrapper = shallow(<Bulletin store={initStore()} />)
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('renders the component', done => {
    const wrapper = shallow(<Bulletin store={initFixtureStore()} />)
      .dive()
      .dive()
      .dive();

    wrapper.find(List).prop('refreshPage')();

    wrapper
      .find(OrderBook)
      .simulate('rowClick', '0x000...', 'ETH/USD', '11/09/2018', {
        preventDefault: jest.fn(),
      });

    setImmediate(() => {
      jest.runOnlyPendingTimers();
      expect(wrapper).toMatchSnapshot();

      wrapper.find(ContractDetails).prop('close')();

      done();
    });
  });
});
