
const items = [
  { address: '0x8822b11262fb2f6c201e6fed8a3098b32851cc42', symbol: 'BTC/USD' },
  { address: '0xf45902281e917bcbeb70ebb574b6949e5ac8c8b2', symbol: 'ETH/USD' }
]

function symbols () {
  let list = []
  items.forEach(function (e) {
    list.push(e.symbol)
  })
  return list
}

function addresses () {
  let list = []
  items.forEach(function (e) {
    list.push(e.address)
  })
  return list
}

function factories (flatten) {
  if (flatten) {
    return items.reduce((obj, item) => {
      obj[item.address] = item.symbol;
      return obj
    }, {})
  }
  return items
}

function getFromSymbol (symbol) {
  var provider = items.filter(item => item.symbol === symbol);
  if (provider && provider.length > 0) { return provider[0]; }
  return null;
}

module.exports.symbols = symbols
module.exports.addresses = addresses
module.exports.factories = factories
module.exports.getFromSymbol = getFromSymbol
