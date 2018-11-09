import truffleContract from 'truffle-contract';
import Web3 from 'web3';

jest.mock('web3');
jest.mock('truffle-contract');

truffleContract.mockImplementation(c => {
  return {
    setProvider: jest.fn(),
  };
});

describe('ethereum web3 connection', () => {
  afterEach(() => {
    jest.resetModules();

    Web3.mockClear();
    truffleContract.mockClear();

    global.web3 = undefined;
  });

  it('initializes with currentProvier', () => {
    global.web3 = {
      currentProvider: jest.fn(),
    };

    require('../../ethereum');

    // all contracts were initialized
    expect(truffleContract.mock.calls).toMatchSnapshot();
  });

  it('initialized without currentProvider', () => {
    const spy = jest.spyOn(global, 'addEventListener');

    require('../../ethereum');

    const listener = spy.mock.calls[0][1];

    // handles no data
    listener({ data: {} });
    expect(Web3).not.toBeCalled();

    // handles success
    listener({ data: { type: 'ETHEREUM_PROVIDER_SUCCESS' } });
    expect(Web3.mock.calls).toMatchSnapshot();
  });
});
