export var formatter = {
  isNumeric: function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  },
  roundTo: function (x, n) {
    if (!x || !this.isNumeric(x)) { return '0' }
    if (!n) { n = 0 }
    var value = x
    var result = (Math.round(Math.abs(x) * Math.pow(10, n)) / Math.pow(10, n))
    result = (value < 0) ? (-1 * result).toFixed(n) : result.toFixed(n)
    return result
  },
  toPercent: function (x) {
    if (!x || !this.isNumeric(x)) { return '0.00%' }
    x = this.roundTo(x, 2)
    return this.toFormattedNumber(x) + '%'
  },
  toDollars: function (x, len) {
    if (!x || !this.isNumeric(x)) { return '$0.00' }
    if (len !== 0 && !len) { len = 2 }
    x = this.roundTo(x, len)
    return '$' + this.toFormattedNumber(x)
  },
  toFormattedNumber: function (x) {
    if (!x || !this.isNumeric(x)) { return '0.00' }
    var parts = x.toString().split('.')
    parts[0] = this.roundTo(parts[0], 0) // removes leading 0's
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
}
