import * as userActions from '../../actions/userActions';

jest.mock('../../ethereum');
jest.mock('../../factoryProvider');

const store = mockStore({});

describe('userActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('getUserAccount', async () => {
    await store.dispatch(userActions.getUserAccount());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserBalance', async () => {
    await store.dispatch(userActions.getUserBalance());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTransactions', async () => {
    await store.dispatch(userActions.getUserTransactions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserPositions', async () => {
    await store.dispatch(userActions.getUserPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTokenPositions', async () => {
    await store.dispatch(userActions.getUserTokenPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserOrders', async () => {
    await store.dispatch(userActions.getUserOrders());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendCashOutRequest', async () => {
    await store.dispatch(userActions.sendCashOutRequest());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('setProcessing', async () => {
    await store.dispatch(userActions.setProcessing());
    expect(store.getActions()).toMatchSnapshot();
  });
});
