import { formatter } from '../formatter';

describe('formatter testing', () => {
  describe('isNumeric', () => {
    it('Blank', () => {
      var result = formatter.isNumeric();
      expect(result).toEqual(false);
    });
    it('letters', () => {
      var result = formatter.isNumeric('AFDD');
      expect(result).toEqual(false);
    });
    it('mix of letters and numbesr', () => {
      var result = formatter.isNumeric('13fgfFF');
      expect(result).toEqual(false);
    });
    it('symbols', () => {
      var result = formatter.isNumeric('#$*#');
      expect(result).toEqual(false);
    });
    it('decimal', () => {
      var result = formatter.isNumeric(345.3455);
      expect(result).toEqual(true);
    });
    it('int', () => {
      var result = formatter.isNumeric(2);
      expect(result).toEqual(true);
    });
  });
  describe('roundTo', () => {
    it('Blank', () => {
      var result = formatter.roundTo();
      expect(result).toEqual('0');
    });
    it('Not a number', () => {
      var result = formatter.roundTo('ABC');
      expect(result).toEqual('0');
    });
    it('Zero', () => {
      var result = formatter.roundTo(0);
      expect(result).toEqual('0');
    });
    it('Small number', () => {
      var result = formatter.roundTo(0.0234);
      expect(result).toEqual('0');
    });
    it('Negative number', () => {
      var result = formatter.roundTo(-3.21);
      expect(result).toEqual('-3');
    });
    it('Decimal as string', () => {
      var result = formatter.roundTo('3.12345', 2);
      expect(result).toEqual('3.12');
    });
    it('Int as string', () => {
      var result = formatter.roundTo('3', 2);
      expect(result).toEqual('3.00');
    });
    it('Int as string without decimals', () => {
      var result = formatter.roundTo('3');
      expect(result).toEqual('3');
    });
    it('leading zeros', () => {
      var result = formatter.roundTo('00003.12345', 2);
      expect(result).toEqual('3.12');
    });
    it('round down to whole number', () => {
      var result = formatter.roundTo(3.12345, 2);
      expect(result).toEqual('3.12');
    });
    it('round up to whole number', () => {
      var result = formatter.roundTo(3.12999, 2);
      expect(result).toEqual('3.13');
    });
    it('Set 2 decimal places', () => {
      var result = formatter.roundTo(3.5, 2);
      expect(result).toEqual('3.50');
    });
    it('Set decimals on int', () => {
      var result = formatter.roundTo(3, 2);
      expect(result).toEqual('3.00');
    });
    it('Set 5 decimal places', () => {
      var result = formatter.roundTo(3.523423422, 5);
      expect(result).toEqual('3.52342');
    });
    it('Remove decimal places', () => {
      var result = formatter.roundTo(3.5, 0);
      expect(result).toEqual('4');
    });
    it('Round up without second param', () => {
      var result = formatter.roundTo(3.5);
      expect(result).toEqual('4');
    });
    it('Round down without second param', () => {
      var result = formatter.roundTo(3.4897789365);
      expect(result).toEqual('3');
    });
  });
  describe('toPercent', () => {
    it('Blank', () => {
      var result = formatter.toPercent();
      expect(result).toEqual('0.00%');
    });
    it('letters', () => {
      var result = formatter.toPercent('AFDD');
      expect(result).toEqual('0.00%');
    });
    it('decimal', () => {
      var result = formatter.toPercent(345.34999);
      expect(result).toEqual('345.35%');
    });
    it('number string', () => {
      var result = formatter.toPercent('00002');
      expect(result).toEqual('2.00%');
    });
    it('int', () => {
      var result = formatter.toPercent(2);
      expect(result).toEqual('2.00%');
    });
  });
  describe('toDollars', () => {
    it('Blank', () => {
      var result = formatter.toDollars();
      expect(result).toEqual('$0.00');
    });
    it('letters', () => {
      var result = formatter.toDollars('AFDD');
      expect(result).toEqual('$0.00');
    });
    it('decimal', () => {
      var result = formatter.toDollars(345.34999);
      expect(result).toEqual('$345.35');
    });
    it('decimal with precision', () => {
      var result = formatter.toDollars(345.34567, 3);
      expect(result).toEqual('$345.346');
    });
    it('leading zero', () => {
      var result = formatter.toDollars('00345');
      expect(result).toEqual('$345.00');
    });
    it('int', () => {
      var result = formatter.toDollars(2);
      expect(result).toEqual('$2.00');
    });
  });
  describe('formatted number', () => {
    it('Blank', () => {
      var result = formatter.toFormattedNumber();
      expect(result).toEqual('0.00');
    });
    it('letters', () => {
      var result = formatter.toFormattedNumber('AFDD');
      expect(result).toEqual('0.00');
    });
    it('decimal', () => {
      var result = formatter.toFormattedNumber(345.34999);
      expect(result).toEqual('345.34999');
    });
    it('leading zero', () => {
      var result = formatter.toFormattedNumber('00345');
      expect(result).toEqual('345');
    });
    it('long number', () => {
      var result = formatter.toFormattedNumber(20000);
      expect(result).toEqual('20,000');
    });
    it('long decimal', () => {
      var result = formatter.toFormattedNumber(2123400.34);
      expect(result).toEqual('2,123,400.34');
    });
    it('int', () => {
      var result = formatter.toFormattedNumber(2);
      expect(result).toEqual('2');
    });
  });
});
