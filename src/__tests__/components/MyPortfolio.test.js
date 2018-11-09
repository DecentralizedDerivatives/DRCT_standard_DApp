import MyPortfolio from '../../components/MyPortfolio';
import CashOut from '../../components/CashOut';
import CreateContract from '../../components/CreateContract';
import {
  getUserPositions,
  getUserTransactions,
  getUserAccount,
} from '../../actions/userActions';

jest.useFakeTimers();
jest.mock('../../ethereum');
jest.mock('../../actions/userActions');
getUserAccount.mockImplementation(() => () => undefined);
getUserPositions.mockImplementation(() => () => undefined);
getUserTransactions.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<MyPortfolio {...props} />)
    .dive()
    .dive()
    .dive();
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
  };
}

describe('<MyPortfolio />', () => {
  it('renders empty component and unmounts', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
    expect(clearInterval).toBeCalledTimes(2);
  });

  it('renders the component', done => {
    const { wrapper } = setup({ store: initFixtureStore() });

    setImmediate(() => {
      jest.runOnlyPendingTimers();

      expect(wrapper).toMatchSnapshot();

      // once initially and once in interval
      expect(getUserPositions).toBeCalledTimes(2);
      expect(getUserTransactions).toBeCalledTimes(2);

      done();
    });
  });

  it('renders create contract', done => {
    const { wrapper } = setup({ store: initFixtureStore() });

    setImmediate(() => {
      wrapper.find('div[children="Create Contract"]').simulate('click');
      expect(wrapper).toMatchSnapshot();

      wrapper.find(CreateContract).prop('close')();
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  it('renders cashout', done => {
    const { wrapper } = setup({ store: initFixtureStore() });

    setImmediate(() => {
      wrapper.find('button[children="Cash Out"]').simulate('click');
      expect(wrapper).toMatchSnapshot();

      wrapper.find(CashOut).prop('close')();
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  it('renders contract details', done => {
    const { wrapper, instance } = setup({ store: initFixtureStore() });

    setImmediate(() => {
      instance.openContractDetails();
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  it('handles row click', done => {
    const { wrapper, instance } = setup({ store: initFixtureStore() });

    setImmediate(() => {
      instance.handleRowClick('0x000...', { preventDefault: jest.fn() });
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });
});
