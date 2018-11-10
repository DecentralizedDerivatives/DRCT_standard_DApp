import * as contractActions from '../../actions/contractActions';

jest.mock('../../ethereum');
jest.mock('../../factoryProvider');

const store = mockStore({});

describe('contractActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('getContractDetails', async () => {
    await store.dispatch(contractActions.getContractDetails());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook', async () => {
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getRecentTrades', async () => {
    await store.dispatch(contractActions.getRecentTrades());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getContractOpenDates', async () => {
    await store.dispatch(contractActions.getContractOpenDates());
    expect(store.getActions()).toMatchSnapshot();
  });
});
