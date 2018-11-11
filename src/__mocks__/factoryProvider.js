const mockProvider = {
  address: '0x000...',
  type: 'eth',
  multiplier: 1,
  duration: 7,
  symbol: 'ETH/USD',
};

export default {
  factories: jest.fn(() => [mockProvider]),
  getFromSymbol: jest.fn(() => mockProvider),
  getFromAddress: jest.fn(() => mockProvider),
  getStaticAddresses: jest.fn(() => ({})),
};
