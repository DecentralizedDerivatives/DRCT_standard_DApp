const items = () => {
    const networkId = this.getNetworkId();
    switch (networkId) {
      case 1: // MAIN NETWORK
        return [
          { address: '0xce971acf8b9b0ce67a8018c4af2094b02c22da43', type: 'btc', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98d3c4adb5c171012d3f1fde32ed8dca488a2b34' },
          { address: '0x8ff7e9f04fed4a6d7184962c6c44d2e701c2fb8a', type: 'eth', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xc479e26a7237c1839f44a09843699597ef23e2c3' }
        ]
      case 4: // RINKEBY
        return  [
          { address: '0x92217550aba5912ba7eb70978871daf7d6bcc16d', type: 'btc', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98cb5fc6ce37b4c4dceab510a56af254c551b705' },
          { address: '0xf55e6ce774cec3817467aed5f5a5769f006658d0', type: 'eth', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xd1864d6e55c0fb2b64035cfbc5a5c2f07e9cff89' }
        ]
      default:
        return [];
    }
  }

  const staticAddresses = () => {
    const networkId = this.getNetworkId();
    switch (networkId) {
      case 1: // MAIN NETWORK
        return {
          exchange: '0xea8261249bb7b99f6754410b059db561ac427692',
          wrapped_ether: '0xf2740c75f221788cf78c716b953a7f1c769d49b9',
          membership: '0xd33615c5ea5d703f06d237f6c56ff2400b564c77'
        }
      case 4: // RINKEBY
        return  {
          exchange: '0x6db2f17f0ff3892c8bbfbd0e1b7a9b4391d66a2e',
          wrapped_ether: '0x6248cb8a316fc8f1488ce56f6ea517151923531a',
          membership: '0x620b6b6ac75ad9234eb6c533688ddd8a5948650e'
        }
      default:
        return {};
    }
  }


module.exports.getNetworkId = () => {
  return window.env && window.env.NETWORK_ID ? parseInt(window.env.NETWORK_ID, 10) : 4
}

module.exports.getStaticAddresses = () => {
  return staticAddresses();
}
module.exports.symbols = () => {
  let list = []
  items().forEach(function (e) {
    list.push(e.symbol)
  })
  return list
}
module.exports.addresses = () => {
  let list = []
  items().forEach(function (e) {
    list.push(e.address)
  })
  return list
}
module.exports.factories = (flatten) => {
  const list = items();
  if (flatten) {
    return list.reduce((obj, item) => {
      obj[item.address] = item.symbol;
      return obj
    }, {})
  }
  return list
}
module.exports.getFromAddress = (address) => {
  var provider = items().filter(item => item.address === address);
  if (provider && provider.length > 0) { return provider[0]; }
  return null;
}
module.exports.getFromSymbol = (symbol) => {
  var provider = items().filter(item => item.symbol === symbol);
  if (provider && provider.length > 0) { return provider[0]; }
  return null;
}
