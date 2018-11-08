import MyPortfolio from '../../components/MyPortfolio';
import CashOut from '../../components/CashOut';
import CreateContract from '../../components/CreateContract';

jest.useFakeTimers();

jest.unmock('../../ethereum');
jest.mock('../../ethereum', () => {
  const mockFactory = {
    isWhitelisted: jest.fn().mockImplementation(() => false),
  };
  return {
    web3: {
      eth: {
        getAccounts: jest.fn(),
        net: {
          getId: jest.fn().mockImplementation(() => 4),
        },
      },
    },
    Factory: {
      at: jest.fn().mockImplementation(() => mockFactory),
    },
  };
});

// TODO: setup
describe('<MyPortfolio />', () => {
  it('renders empty component', () => {
    const wrapper = shallow(<MyPortfolio store={initStore()} />)
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('renders the component', done => {
    const wrapper = shallow(<MyPortfolio store={initFixtureStore()} />)
      .dive()
      .dive()
      .dive();

    wrapper.find('div[children="Create Contract"]').simulate('click');
    wrapper.find('button[children="Cash Out"]').simulate('click');

    wrapper
      .instance()
      .handleRowClick('0x000...', { preventDefault: jest.fn() });
    wrapper.instance().openContractDetails();

    setImmediate(() => {
      jest.runOnlyPendingTimers();
      expect(wrapper).toMatchSnapshot();

      wrapper.find(CreateContract).prop('close')();
      wrapper.find(CashOut).prop('close')();

      done();
    });
  });
});
