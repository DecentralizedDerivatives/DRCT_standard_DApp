
const items = () => {
  const networkId = this.getNetworkId();
  switch (networkId) {
    case 1: // MAIN NETWORK
      return [
        { address: '0x58ae23fd188a23a4f1224c3072fc7db40fca8d9c', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98d3c4adb5c171012d3f1fde32ed8dca488a2b34' },
        { address: '0x8207cea5aa1a9047b6607611c2b5b3f04df7b0d3', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xc479e26a7237c1839f44a09843699597ef23e2c3' }
      ]
    case 4: // RINKEBY
      return  [
        { address: '0x804870d9b8184e12444405e1ee114757b97897b8', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98cb5fc6ce37b4c4dceab510a56af254c551b705' },
        { address: '0xa6fc8ed0d94a33de24eda0c226546ffa3737358a', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xd1864d6e55c0fb2b64035cfbc5a5c2f07e9cff89' }
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
        exchange: '0x1f2176d79fdc0ec4ddec59699e24ff05154a61b5',
        wrapped_ether: '0xf2740c75f221788cf78c716b953a7f1c769d49b9',
        membership: '0x4286b9997df2af09e186c332e655e9cef71a40fa'
      }
    case 4: // RINKEBY
      return  {
        exchange: '0x8a8c8caf721e1c7ebcc01522185f263370aa7f8d',
        wrapped_ether: '0x6248cb8a316fc8f1488ce56f6ea517151923531a',
        membership: '0x50d9bf95bf09d6ea9812da2763eac32d21ca31d5'
      }
    default:
      return {};
  }
}

module.exports.getNetworkId = () => {
  return window.env.NETWORK_ID
  return 4
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
