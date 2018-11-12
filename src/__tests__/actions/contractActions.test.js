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

import MockDate from 'mockdate';

import { ExchangeInstance, FactoryInstance, bn } from '../../ethereum';
import FactoryProvider from '../../factoryProvider';
import { getStartDatePrice } from '../../actions/common';

const store = mockStore({});

describe('contractActions', () => {
  afterEach(() => {
    store.clearActions();
    MockDate.reset();
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

  it('getOrderBook filters by date', async () => {
    MockDate.set('01/01/2018');
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook sorts orders', async () => {
    MockDate.set('01/01/2018');
    ExchangeInstance.getOrders.mockImplementationOnce(() => [bn('1'), bn('2')]);
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook no start price', async () => {
    MockDate.set('01/01/2018');
    getStartDatePrice.mockImplementationOnce(() => undefined);
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook short token type', async () => {
    MockDate.set('01/01/2018');
    FactoryInstance.getTokenType.mockImplementationOnce(() => bn('1'));
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook no token date', async () => {
    FactoryInstance.token_dates.call.mockImplementationOnce(() => bn('0'));
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook no orders', async () => {
    ExchangeInstance.getOrders.mockImplementationOnce(() => [bn('0')]);
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook silent', async () => {
    await store.dispatch(contractActions.getOrderBook(true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getOrderBook error', async () => {
    ExchangeInstance.getBookCount.mockImplementationOnce(() => {
      throw new Error('error');
    });
    await store.dispatch(contractActions.getOrderBook());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getRecentTrades', async () => {
    await store.dispatch(contractActions.getRecentTrades());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getRecentTrades with default provider data', async () => {
    FactoryProvider.getFromAddress.mockImplementationOnce(() => ({}));
    await store.dispatch(contractActions.getRecentTrades());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getRecentTrades with short token', async () => {
    FactoryInstance.getTokenType.mockImplementationOnce(() => bn('1'));
    await store.dispatch(contractActions.getRecentTrades());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getRecentTrades no events', async () => {
    ExchangeInstance.Sale.mockImplementationOnce(
      jest.fn(() => ({
        get: jest.fn(callback => callback(undefined, [])),
      }))
    );
    await store.dispatch(contractActions.getRecentTrades());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('getRecentTrades silent', async () => {
    await store.dispatch(contractActions.getRecentTrades(true));
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

  it('getContractOpenDates filters by date', async () => {
    MockDate.set('01/01/2018');
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
