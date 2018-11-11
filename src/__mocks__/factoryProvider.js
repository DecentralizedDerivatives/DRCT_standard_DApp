const mockProvider = { address: '0x000...', type: 'eth', multiplier: 1 };

export default {
  factories: jest.fn(() => [mockProvider]),
  getFromSymbol: jest.fn(() => mockProvider),
  getFromAddress: jest.fn(() => mockProvider),
  getStaticAddresses: jest.fn(() => ({})),
};
