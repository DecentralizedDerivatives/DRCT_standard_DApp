import mockAxios from 'jest-mock-axios';

import api from '../../api/api';

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it('should call BTC url', () => {
  const priceData = api['btc'].get();
  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=2000'
  );
});
it('should call ETH url', () => {
  const priceData = api['eth'].get();
  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=2000'
  );
});
