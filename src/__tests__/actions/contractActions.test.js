import * as contractActions from '../../actions/contractActions';

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

import { ExchangeInstance, FactoryInstance } from '../../ethereum';
import { getStartDatePrice } from '../../actions/common';

const store = mockStore({});

describe('contractActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('getContractDetails', async () => {
    await store.dispatch(contractActions.getContractDetails());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getContractDetails with no start price', async () => {
    getStartDatePrice.mockImplementationOnce(() => undefined);
    await store.dispatch(contractActions.getContractDetails());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getContractDetails error', async () => {
    getStartDatePrice.mockImplementationOnce(() => {
      throw new Error('error');
    });
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

  it('getRecentTrades error', async () => {
    ExchangeInstance.Sale.mockImplementationOnce(() => undefined);
    await store.dispatch(contractActions.getRecentTrades());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getContractOpenDates', async () => {
    await store.dispatch(contractActions.getContractOpenDates());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getContractOpenDates error', async () => {
    FactoryInstance.getDateCount.mockImplementationOnce(() => {
      throw new Error('error');
    });
    await store.dispatch(contractActions.getContractOpenDates());
    expect(store.getActions()).toMatchSnapshot();
  });
});
