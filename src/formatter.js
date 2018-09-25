export var formatter = {
  roundTo: function (x, n) {
    if (!x) { return x }
    var value = x
    var result = (Math.round(Math.abs(x) * Math.pow(10, n)) / Math.pow(10, n))
    result = (value < 0) ? (-1 * result).toFixed(n) : result.toFixed(n)
    return result
  },
  toPercent: function (x) {
    if (!x) { return x }
    x = this.roundTo(x, 2)
    return this.toFormattedNumber(x) + '%'
  },
  toDollars: function (x, len) {
    if (len !== 0 && !len) { len = 2 }
    x = this.roundTo(x, len)
    if (len > 2 && x.toString().split('').pop() === '0') {
      return this.toDollars(x, len - 1)
    }
    return '$' + this.toFormattedNumber(x)
  },
  toFormattedNumber: function (x) {
    if (!x) { return x }
    var parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
}
