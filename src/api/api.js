import {get} from './utils';

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

export default {
  eth,
  btc,
};
