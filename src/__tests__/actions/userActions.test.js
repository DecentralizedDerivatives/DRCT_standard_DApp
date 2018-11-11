import * as userActions from '../../actions/userActions';

jest.mock('../../ethereum');
jest.mock('../../factoryProvider');
jest.mock('../../actions/common', () => ({
  getStartDatePrice: jest.fn(() => 1),
}));
jest.mock('../../api', () => ({
  eth: {
    get: jest.fn(() => [0, 1]),
  },
}));

import {
  web3,
  WrappedInstance,
  ExchangeInstance,
  FactoryInstance,
  DRCTInstance,
} from '../../ethereum';
import { getStartDatePrice } from '../../actions/common';

web3.eth.getAccounts.mockImplementation(() => ['0x000...']);

const store = mockStore({});

describe('userActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('getUserAccount', async () => {
    await store.dispatch(userActions.getUserAccount());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserAccount error', async () => {
    web3.eth.getAccounts.mockImplementationOnce(() => undefined);
    await store.dispatch(userActions.getUserAccount());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserBalance', async () => {
    await store.dispatch(userActions.getUserBalance());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserBalance error', async () => {
    WrappedInstance.balanceOf.mockImplementationOnce(() => undefined);
    await store.dispatch(userActions.getUserBalance());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTransactions', async () => {
    await store.dispatch(userActions.getUserTransactions('0x000...'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTransactions filters by account', async () => {
    await store.dispatch(userActions.getUserTransactions('0x111...'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTransactions error', async () => {
    FactoryInstance.ContractCreation.mockImplementationOnce(() => ({
      get: jest.fn(callback => callback('error')),
    }));
    await store.dispatch(userActions.getUserTransactions('0x000...'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTransactions silent', async () => {
    await store.dispatch(userActions.getUserTransactions('0x000...', true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserPositions', async () => {
    await store.dispatch(userActions.getUserPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserPositions error', async () => {
    FactoryInstance.getTokens.mockImplementationOnce(() => undefined);
    await store.dispatch(userActions.getUserPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserPositions silent', async () => {
    await store.dispatch(userActions.getUserPositions('0x000...', true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserPositions short token', async () => {
    FactoryInstance.getTokenType.mockImplementationOnce(() => ({ c: [1] }));
    await store.dispatch(userActions.getUserPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserPositions no balance', async () => {
    DRCTInstance.balanceOf.mockImplementationOnce(() => ({ c: [0] }));
    await store.dispatch(userActions.getUserPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserPositions no start price', async () => {
    getStartDatePrice.mockImplementationOnce(() => undefined);
    await store.dispatch(userActions.getUserPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTokenPositions', async () => {
    await store.dispatch(userActions.getUserTokenPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserTokenPositions error', async () => {
    FactoryInstance.getTokens.mockImplementationOnce(() => undefined);
    await store.dispatch(userActions.getUserTokenPositions());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserOrders', async () => {
    await store.dispatch(userActions.getUserOrders());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getUserOrders error', async () => {
    ExchangeInstance.getUserOrders.mockImplementationOnce(() => undefined);
    await store.dispatch(userActions.getUserOrders());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendCashOutRequest', async () => {
    await store.dispatch(userActions.sendCashOutRequest());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('sendCashOutRequest error', async () => {
    WrappedInstance.withdraw.mockImplementationOnce(() => undefined);
    await store.dispatch(userActions.sendCashOutRequest());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('setProcessing', async () => {
    await store.dispatch(userActions.setProcessing());
    expect(store.getActions()).toMatchSnapshot();
  });
});
