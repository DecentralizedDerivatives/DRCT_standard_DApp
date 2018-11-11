import BigNumber from 'bignumber.js';

export function bn(number) {
  return new BigNumber(number);
}

const mockTransaction = { tx: '0x000...' };

const mockDate = Math.round(new Date('01/01/2018').getTime() / 1000);

const mockContract = mockContractInstance => ({
  at: jest.fn(() => mockContractInstance),
});

export const web3 = {
  eth: {
    getAccounts: jest.fn(),
    net: {
      getId: jest.fn(() => 4),
    },
  },
};

// instances are exported so that tests can override them
export const FactoryInstance = {
  ContractCreation: jest.fn(() => ({
    get: jest.fn(callback =>
      callback(undefined, [
        { args: { _sender: '0x000...' }, transactionHash: '0x000...' },
      ])
    ),
  })),
  getTokenType: jest.fn(() => bn('0')),
  isWhitelisted: jest.fn(() => false),
  getDateCount: jest.fn(() => 1),
  getTokens: jest.fn(() => ['0x000...']),
  startDates: {
    call: jest.fn(() => bn(mockDate)),
  },
  token_dates: {
    call: jest.fn(() => bn(mockDate)),
  },
  user_contract: {
    call: jest.fn(),
  },
};
export const DRCTInstance = {
  approve: jest.fn(),
  balanceOf: jest.fn(() => bn('1e10')),
  allowance: jest.fn(() => bn('10')),
  getFactoryAddress: jest.fn(() => '0x000...'),
};
export const ExchangeInstance = {
  getOrder: jest.fn(() => [bn('10'), bn('20'), bn('30'), '0x000...']),
  getOrders: jest.fn(() => [bn('1')]),
  buy: jest.fn(() => mockTransaction),
  list: jest.fn(() => mockTransaction),
  unlist: jest.fn(() => mockTransaction),
  getUserOrders: jest.fn(() => [bn('0')]),
  openBooks: jest.fn(() => '0x000...'),
  getBookCount: jest.fn(() => 1),
  Sale: jest.fn(() => ({
    get: jest.fn(callback =>
      callback(undefined, [
        { args: { _token: '0x000...', _price: 1, _amount: 1 } },
      ])
    ),
  })),
};
export const UserContractInstance = {
  Initiate: jest.fn(() => mockTransaction),
};
export const WrappedInstance = {
  balanceOf: jest.fn(() => bn('1e10')),
  withdraw: jest.fn(() => mockTransaction),
};

export const Factory = mockContract(FactoryInstance);
export const Oracle = mockContract(FactoryInstance);
export const Exchange = mockContract(ExchangeInstance);
export const Swap = mockContract(FactoryInstance);
export const UserContract = mockContract(UserContractInstance);
export const Wrapped = mockContract(WrappedInstance);
export const DRCT = mockContract(DRCTInstance);
