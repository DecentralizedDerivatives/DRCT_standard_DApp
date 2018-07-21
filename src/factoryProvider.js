
const items = [
  { address: '0x5dbc9e739bcc518c4ce3084e597117eb0dc929e6', symbol: 'BTC/USD', duration: 7, multiplier: 1, oracle: '0xb7e4411299161051bdae859392537d367758a62a' },
  { address: '0xa18e394d8de8f0203fa89b9f35212a2ecbede48a', symbol: 'ETH/USD', duration: 7, multiplier: 5, oracle: '0xf5b3b07568b0e90df92df0a22f955a7219077289' }
]

const staticAddresses = {
  exchange: '0x5c9b3e0774dadf6977d6b13d4cf149736318fc32',
  wrapped_ether: '0x5a123d2f53a0410def29f1e2902abea66f59e246',
  membership: '0xfcb2342eca570fb10da23ce7dd430f41e4f5a989'
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
