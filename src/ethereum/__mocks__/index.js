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
  getTokenType: jest.fn(() => ({ c: [0] })),
  isWhitelisted: jest.fn(() => false),
  getDateCount: jest.fn(() => 1),
  getTokens: jest.fn(() => ['0x000...']),
  startDates: {
    call: jest.fn(() => ({ c: [0] })),
  },
  token_dates: {
    call: jest.fn(() => ({ c: [1] })),
  },
  user_contract: {
    call: jest.fn(),
  },
};
export const DRCTInstance = {
  approve: jest.fn(),
  balanceOf: jest.fn(() => ({ c: [1], e: 10 })),
  allowance: jest.fn(() => ({ c: [10, 20] })),
  getFactoryAddress: jest.fn(() => '0x000...'),
};
export const ExchangeInstance = {
  getOrder: jest.fn(() => [{ c: [10] }, { c: [20] }, { c: [30] }, '0x000...']),
  getOrders: jest.fn(() => [{ c: [1] }]),
  buy: jest.fn(() => ({ tx: '0x000...' })),
  list: jest.fn(() => ({ tx: '0x000...' })),
  unlist: jest.fn(() => ({ tx: '0x000...' })),
  getUserOrders: jest.fn(() => [{ c: [0] }]),
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
  Initiate: jest.fn(() => ({ tx: '0x000...' })),
};
export const WrappedInstance = {
  balanceOf: jest.fn(() => ({ c: [1], e: 10 })),
  withdraw: jest.fn(() => ({ tx: '0x000...' })),
};

export const Factory = mockContract(FactoryInstance);
export const Oracle = mockContract(FactoryInstance);
export const Exchange = mockContract(ExchangeInstance);
export const Swap = mockContract(FactoryInstance);
export const UserContract = mockContract(UserContractInstance);
export const Wrapped = mockContract(WrappedInstance);
export const DRCT = mockContract(DRCTInstance);
