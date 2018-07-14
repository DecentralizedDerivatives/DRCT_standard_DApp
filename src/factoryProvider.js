
// Factory Address 0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642 – BTC/USD
// Factory Address 0xbb966cce6e880b17d35d2575f5124d880e0c247f – ETH/USD

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

module.exports.symbols = symbols
module.exports.addresses = addresses
module.exports.factories = factories
