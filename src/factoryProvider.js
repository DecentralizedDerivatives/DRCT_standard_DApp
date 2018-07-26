
const items = [
  { address: '0x804870d9b8184e12444405e1ee114757b97897b8', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0x98cb5fc6ce37b4c4dceab510a56af254c551b705' },
  { address: '0xa6fc8ed0d94a33de24eda0c226546ffa3737358a', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xd1864d6e55c0fb2b64035cfbc5a5c2f07e9cff89' }
]

const staticAddresses = {
  exchange: '0x8a8c8caf721e1c7ebcc01522185f263370aa7f8d',
  wrapped_ether: '0x6248cb8a316fc8f1488ce56f6ea517151923531a',
  membership: '0x50d9bf95bf09d6ea9812da2763eac32d21ca31d5'
}


module.exports.getStaticAddresses = () => {
  return staticAddresses
}
module.exports.symbols = () => {
  let list = []
  items.forEach(function (e) {
    list.push(e.symbol)
  })
  return list
}
module.exports.addresses = () => {
  let list = []
  items.forEach(function (e) {
    list.push(e.address)
  })
  return list
}
module.exports.factories = (flatten) => {
  if (flatten) {
    return items.reduce((obj, item) => {
      obj[item.address] = item.symbol;
      return obj
    }, {})
  }
  return items
}
module.exports.getFromAddress = (address) => {
  var provider = items.filter(item => item.address === address);
  if (provider && provider.length > 0) { return provider[0]; }
  return null;
}
module.exports.getFromSymbol = (symbol) => {
  var provider = items.filter(item => item.symbol === symbol);
  if (provider && provider.length > 0) { return provider[0]; }
  return null;
}
