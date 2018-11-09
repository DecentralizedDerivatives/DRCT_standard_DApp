import * as networkProvider from '../networkProvider.js';

describe('networkProvider testing', () => {
  it('Returns main network', () => {
    var result = networkProvider['1'];
    expect(result.className).toEqual('ethereum-network-label');
  });
  it('Returns main network', () => {
    var result = networkProvider['3'];
    expect(result.className).toEqual('ropsten-network-label');
  });
  it('Returns main network', () => {
    var result = networkProvider['4'];
    expect(result.className).toEqual('rinkeby-network-label');
  });
  it('Returns main network', () => {
    var result = networkProvider['42'];
    expect(result.className).toEqual('kovan-network-label');
  });
});
