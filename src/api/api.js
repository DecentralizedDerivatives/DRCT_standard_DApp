import { get } from './utils';

const btc = {
  get: () =>
    get(
      'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=2000'
    ),
};

const eth = {
  get: () =>
    get(
      'https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=2000'
    ),
};

const btcMinute = {
  get: () =>
    get(
      'https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=2000'
    ),
};

const ethMinute = {
  get: () =>
    get(
      'https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=2000'
    ),
};

export default {
  eth,
  btc,
  ethMinute,
  btcMinute,
};
