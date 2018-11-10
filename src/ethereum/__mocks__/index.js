const mockFactory = {
  isWhitelisted: jest.fn(() => false),
};

const mockContract = {
  at: jest.fn(),
};

export const web3 = {
  eth: {
    getAccounts: jest.fn(),
    net: {
      getId: jest.fn(() => 4),
    },
  },
};

export const Factory = {
  at: jest.fn(() => mockFactory),
};

export const Oracle = mockContract;
