
// Factory Address 0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642 – BTC/USD
// Factory Address 0xbb966cce6e880b17d35d2575f5124d880e0c247f – ETH/USD

const items = [
  { address: '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642', symbol: 'BTC/USD' },
  { address: '0xbb966cce6e880b17d35d2575f5124d880e0c247f', symbol: 'ETH/USD' }
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

function factories () {
  return items
}

module.exports.symbols = symbols
module.exports.addresses = addresses
module.exports.factories = factories
