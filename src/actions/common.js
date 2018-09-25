import { Oracle } from '../ethereum';

const moment = require('moment');

export const getStartDatePrice = async (oracleAddress, startDate) => {
  let dt = startDate ? moment(startDate, 'MM/DD/YYYY').utc().startOf('day') : null;
  let date = dt.format('x') / 1000
  const oracle = await Oracle.at(oracleAddress)
  var data = await oracle.retrieveData(date)
  if (!data || !data.c || !data.c[0]) { return 0 }
  let val = parseFloat('0.00' + data.c[0].toString())
  // console.log('val', val)
  let multiplier = '1e' + (data.e).toString()
  let adjustedValue = val * (Number(multiplier))
  // console.log('adjustedValue', adjustedValue)
  return adjustedValue
}
