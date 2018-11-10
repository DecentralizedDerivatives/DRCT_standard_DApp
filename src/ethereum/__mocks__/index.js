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
  isWhitelisted: jest.fn(() => false),
  token_dates: {
    call: jest.fn(),
  },
  user_contract: {
    call: jest.fn(),
  },
};
export const DRCTInstance = {
  approve: jest.fn(),
  allowance: jest.fn(() => ({ c: [10, 20] })),
};
export const ExchangeInstance = {
  getOrder: jest.fn(() => [{ c: [10] }, { c: [20] }, { c: [30] }, '0x000...']),

  buy: jest.fn(() => ({ tx: '0x000...' })),
  list: jest.fn(() => ({ tx: '0x000...' })),
  unlist: jest.fn(() => ({ tx: '0x000...' })),
  getUserOrders: jest.fn(() => [{ c: [0] }]),
};
export const UserContractInstance = {
  Initiate: jest.fn(() => ({ tx: '0x000...' })),
};

export const Factory = mockContract(FactoryInstance);
export const Oracle = mockContract(FactoryInstance);
export const Exchange = mockContract(ExchangeInstance);
export const Swap = mockContract(FactoryInstance);
export const UserContract = mockContract(UserContractInstance);
export const Wrapped = mockContract(FactoryInstance);
export const DRCT = mockContract(DRCTInstance);
