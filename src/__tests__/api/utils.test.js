import mockAxios from 'jest-mock-axios';

import * as utils from '../../api/utils';

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});
// jest.setTimeout(20000)
it('should call BTC url', () => {
  const data = utils.get('foo');
  expect(mockAxios.get).toHaveBeenCalledWith('foo');
});
// it('should raise error for fake url', async () => {
//   const data = await utils.get('foo')
//   console.log('DATA', data)
//   done()
// });
