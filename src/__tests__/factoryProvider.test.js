import * as factoryProvider from '../factoryProvider.js';

describe('factoryProvider testing', () => {
  afterEach(() => {
    global.env = {}
  });
  describe('getNetworkId', () => {
    it('Returns Main', () => {
      global.env = { NETWORK_ID: 1 }
      var result = factoryProvider.getNetworkId()
      expect(result).toEqual(1);
    });
    it('Returns RINKEBY default', () => {
      var result = factoryProvider.getNetworkId()
      expect(result).toEqual(4);
    });
  })
  describe('getStaticAddresses', () => {
    it('Returns RINKEBY default', () => {
      var result = factoryProvider.getStaticAddresses()
      expect(result.exchange).toEqual('0x6db2f17f0ff3892c8bbfbd0e1b7a9b4391d66a2e');
    });
    it('Returns Main', () => {
      global.env = { NETWORK_ID: 1 }
      var result = factoryProvider.getStaticAddresses()
      expect(result.exchange).toEqual('0xea8261249bb7b99f6754410b059db561ac427692');
    });
    it('Returns empty', () => {
      global.env = { NETWORK_ID: 99 }
      var result = factoryProvider.getStaticAddresses()
      expect(result).toEqual({});
    });
  })
  describe('Symbols', () => {
    it('Returns RINKEBY default', () => {
      const expectedSymbols = [
        'BTC/USD',
        'ETH/USD'
      ]
      var result = factoryProvider.symbols()
      expect(result).toEqual(expectedSymbols);
    });
    it('Returns Main', () => {
      const expectedSymbols = [
        'BTC/USD',
        'ETH/USD'
      ]
      global.env = { NETWORK_ID: 1 }
      var result = factoryProvider.symbols()
      expect(result).toEqual(expectedSymbols);
    });
    it('Returns empty', () => {
      const expectedSymbols = []
      global.env = { NETWORK_ID: 99 }
      var result = factoryProvider.symbols()
      expect(result).toEqual(expectedSymbols);
    });
  })
  describe('Addresses', () => {
    it('Returns RINKEBY default', () => {
      const expectedResult = [
        '0x92217550aba5912ba7eb70978871daf7d6bcc16d',
        '0xf55e6ce774cec3817467aed5f5a5769f006658d0'
      ]
      var result = factoryProvider.addresses()
      expect(result).toEqual(expectedResult);
    });
    it('Returns Main', () => {
      const expectedResult = [
        '0xce971acf8b9b0ce67a8018c4af2094b02c22da43',
        '0x8ff7e9f04fed4a6d7184962c6c44d2e701c2fb8a'
      ]
      global.env = { NETWORK_ID: 1 }
      var result = factoryProvider.addresses()
      expect(result).toEqual(expectedResult);
    });
  })
  describe('Factories', () => {
    it('Returns Main', () => {
      const expectedResult = [
        { address: '0xce971acf8b9b0ce67a8018c4af2094b02c22da43', type: 'btc', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98d3c4adb5c171012d3f1fde32ed8dca488a2b34' },
        { address: '0x8ff7e9f04fed4a6d7184962c6c44d2e701c2fb8a', type: 'eth', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xc479e26a7237c1839f44a09843699597ef23e2c3' }
      ]
      global.env = { NETWORK_ID: 1 }
      var result = factoryProvider.factories()
      expect(result).toEqual(expectedResult);
    });
    it('Returns RINKEBY default', () => {
      const expectedResult = [
        { address: '0x92217550aba5912ba7eb70978871daf7d6bcc16d', type: 'btc', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98cb5fc6ce37b4c4dceab510a56af254c551b705' },
        { address: '0xf55e6ce774cec3817467aed5f5a5769f006658d0', type: 'eth', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xd1864d6e55c0fb2b64035cfbc5a5c2f07e9cff89' }
      ]
      var result = factoryProvider.factories()
      expect(result).toEqual(expectedResult);
    });
    it('Returns Flattened RINKEBY default', () => {
      const expectedResult = {
        '0x92217550aba5912ba7eb70978871daf7d6bcc16d': 'BTC/USD',
        '0xf55e6ce774cec3817467aed5f5a5769f006658d0': 'ETH/USD'
      }
      var result = factoryProvider.factories(true)
      expect(result).toEqual(expectedResult);
    });
  })
  describe('getFromAddress', () => {
    it('Returns btc item', () => {
      const expectedResult = {
        address: '0x92217550aba5912ba7eb70978871daf7d6bcc16d', type: 'btc', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98cb5fc6ce37b4c4dceab510a56af254c551b705'
      }
      var result = factoryProvider.getFromAddress('0x92217550aba5912ba7eb70978871daf7d6bcc16d')
      expect(result).toEqual(expectedResult);
    });
    it('Returns default value', () => {
      var result = factoryProvider.getFromAddress('999')
      expect(result).toEqual(null);
    });
  })
  describe('getFromSymbol', () => {
    it('Returns btc item', () => {
      const expectedResult = {
        address: '0x92217550aba5912ba7eb70978871daf7d6bcc16d', type: 'btc', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98cb5fc6ce37b4c4dceab510a56af254c551b705'
      }
      var result = factoryProvider.getFromSymbol('BTC/USD')
      expect(result).toEqual(expectedResult);
    });
    it('Returns default value', () => {
      var result = factoryProvider.getFromSymbol('foo')
      expect(result).toEqual(null);
    });
  })


});
