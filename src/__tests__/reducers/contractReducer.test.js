import contractReducer from '../../reducers/contractReducer';

import {
  SET_CONTRACT_DETAILS,
  SET_ORDERBOOK,
  SET_RECENT_TRADES,
  SET_CONTRACT_OPEN_DATES,
  SET_CONTRACT_CREATED,
  SET_CONTRACT_ERROR,
  SET_CONTRACT_FUNDED,
  SET_SEND_FUNDS_ERROR
} from '../../actions/types';

const initialState = {
  contractAddress: '',
  contractDuration: 0,
  contractMultiplier: 0,
  oracleAddress: '',
  orderbook: [],
  recentTrades: [],
  contractOpenDates: [],
  newContract: {
    id: '',
    address: '',
    duration: '',
    currency: '',
    startDate: '',
    amount: 0,
    funded: false,
    fundedTx: ''
  },
  newContractCreateError: null,
  newContractFundsError: null
};

describe('contractReducer', () => {
  describe('initialState', () => {
    it('should set default state', () => {
      const state = contractReducer(undefined, { type: '@@INIT' });

      expect(state).toEqual(initialState);
    });
  });

  describe('SET_CONTRACT_DETAILS', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_CONTRACT_DETAILS,
        payload: {
          contractAddress: '0x0xxxxxx2',
          contractDuration: 1,
          contractMultiplier: 10,
          oracleAddress: '0x0xxxxxx3'
        }
      };

      const expectedState = {
        ...initialState,
        contractAddress: '0x0xxxxxx2',
        contractDuration: 1,
        contractMultiplier: 10,
        oracleAddress: '0x0xxxxxx3'
      };

      const state = contractReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_ORDERBOOK', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_ORDERBOOK,
        payload: [
          {
            orderId: '0x0xxx',
            address: '0x0xxxxxx1',
            price: '10',
            quantity: '2',
            date: '01-01-18',
            symbol: 'BTC'
          }
        ]
      };

      const expectedState = {
        ...initialState,
        orderbook: [
          {
            orderId: '0x0xxx',
            address: '0x0xxxxxx1',
            price: '10',
            quantity: '2',
            date: '01-01-18',
            symbol: 'BTC'
          }
        ]
      };

      const state = contractReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_RECENT_TRADES', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_RECENT_TRADES,
        payload: [
          {
            address: '0x0xxxxxx1',
            volume: '10',
            price: '10',
            quantity: '2',
            symbol: '????'
          }
        ]
      };

      const expectedState = {
        ...initialState,
        recentTrades: [
          {
            address: '0x0xxxxxx1',
            volume: '10',
            price: '10',
            quantity: '2',
            symbol: '????'
          }
        ]
      };

      const state = contractReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
