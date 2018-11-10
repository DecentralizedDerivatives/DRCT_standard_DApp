import * as orderActions from '../../actions/orderActions';

jest.mock('../../ethereum');
jest.mock('../../factoryProvider');

const store = mockStore({});

import {
  ExchangeInstance,
  DRCTInstance,
  UserContractInstance,
} from '../../ethereum';

describe('orderActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('getOrderDetails without id', async () => {
    await store.dispatch(orderActions.getOrderDetails());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderDetails with id', async () => {
    await store.dispatch(orderActions.getOrderDetails('0x000...'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderDetails error', async () => {
    ExchangeInstance.getOrder.mockImplementationOnce(() => undefined);
    await store.dispatch(orderActions.getOrderDetails('0x000...'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendBuyOrder', async () => {
    await store.dispatch(orderActions.sendBuyOrder());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendBuyOrder error', async () => {
    ExchangeInstance.buy.mockImplementationOnce(() => undefined);
    await store.dispatch(orderActions.sendBuyOrder());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendUnlistOrder', async () => {
    await store.dispatch(orderActions.sendUnlistOrder());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendUnlistOrder error', async () => {
    ExchangeInstance.unlist.mockImplementationOnce(() => undefined);
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

  it('sendListOrder error', async () => {
    ExchangeInstance.list.mockImplementationOnce(() => undefined);
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

  it('sendApproveOrder, token amount is more than approved', async () => {
    await store.dispatch(
      orderActions.sendApproveOrder({
        token: '0x000...',
        tokenAmount: 100,
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendApproveOrder, no token in orders', async () => {
    await store.dispatch(
      orderActions.sendApproveOrder({
        token: '0x111...',
        tokenAmount: 1,
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendApproveOrder error', async () => {
    DRCTInstance.approve.mockImplementationOnce(() => {
      throw new Error('error');
    });
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

  it('sendCreateContractOrder error', async () => {
    UserContractInstance.Initiate.mockImplementationOnce(() => undefined);
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
