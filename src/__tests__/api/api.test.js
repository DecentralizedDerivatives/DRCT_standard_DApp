import mockAxios from 'jest-mock-axios';

import api from '../../api/api';

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it('should call BTC url', () => {
  const priceData = api['btc'].get();
  expect(mockAxios.get.mock.calls).toMatchSnapshot();
});

it('should call ETH url', () => {
  const priceData = api['eth'].get();
  expect(mockAxios.get.mock.calls).toMatchSnapshot();
});

it('should call minute BTC url', () => {
  const priceData = api['btcMinute'].get();
  expect(mockAxios.get.mock.calls).toMatchSnapshot();
});

it('should call minute ETH url', () => {
  const priceData = api['ethMinute'].get();
  expect(mockAxios.get.mock.calls).toMatchSnapshot();
});
