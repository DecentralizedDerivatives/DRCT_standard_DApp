import * as orderActions from '../../actions/orderActions';

jest.mock('../../ethereum');
jest.mock('../../factoryProvider');

const store = mockStore({});

describe('orderActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('getOrderDetails', async () => {
    await store.dispatch(orderActions.getOrderDetails());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendBuyOrder', async () => {
    await store.dispatch(orderActions.sendBuyOrder());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendUnlistOrder', async () => {
    await store.dispatch(orderActions.sendUnlistOrder());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendListOrder', async () => {
    await store.dispatch(
      orderActions.sendListOrder({
        token: '0x000...',
        tokenAmount: 1,
        price: 1,
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendApproveOrder', async () => {
    await store.dispatch(
      orderActions.sendApproveOrder({
        token: '0x000...',
        tokenAmount: 1,
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendCreateContractOrder', async () => {
    await store.dispatch(
      orderActions.sendCreateContractOrder({
        duration: 1,
        currency: 'ETH',
        startDate: '01/01/2018',
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('setProcessing', async () => {
    await store.dispatch(orderActions.setProcessing());
    expect(store.getActions()).toMatchSnapshot();
  });
});
