
const items = [
  { address: '0x95c9c47558115b12f25dce5103e73e0803a5b9c7', symbol: 'BTC/USD' },
  { address: '0xdfb380afc0948e9551fd17b486681122b5936c2a', symbol: 'ETH/USD' }
]

const staticAddresses = {exchange: '0x2242ef4a4a1b4510c09c1a4de12cd96b0108d0cb',
  wrapped_ether: '0xc733a8ba37590e71096f10b23a049f3a30386c6f',
  membership: '0xdcff3a825f6ab9a861bdf481017d91b25ac980a4'}

function getStaticAddresses(){
  return staticAddresses
}

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

function getFromAddress (address) {
  var provider = items.filter(item => item.address === address);
  if (provider && provider.length > 0) { return provider[0]; }
  return null;
}
function getFromSymbol (symbol) {
  var provider = items.filter(item => item.symbol === symbol);
  if (provider && provider.length > 0) { return provider[0]; }
  return null;
}

module.exports.symbols = symbols
module.exports.addresses = addresses
module.exports.factories = factories
module.exports.getFromAddress = getFromAddress
module.exports.getFromSymbol = getFromSymbol
module.exports.getStaticAddresses = getStaticAddresses
