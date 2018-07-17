import userReducer from '../../reducers/userReducer';

import {
  SET_USER_ACCOUNT,
  SET_USER_BALANCE,
  SET_USER_TRANSACTIONS,
  SET_USER_POSITIONS,
  SET_USER_TOKENS,
  SET_USER_ORDERS,
  SET_CASHOUT_RECEIPT,
  SET_CASHOUT_ERROR
} from '../../actions/types';

describe('userReducer', () => {
  const initialState = {
    userAccount: '',
    userBalance: 0,
    userTransactions: [],
    userPositions: [],
    userTokens: [],

    userOrders: [],
    userOrderLabels: '',
    cashOut: {
      id: '',
      amount: 0
    },
    cashOutError: null
  };

  describe('initialState', () => {
    it('should set default state', () => {
      const state = userReducer(undefined, { type: '@@INIT' });

      expect(state).toEqual(initialState);
    });
  });

  describe('SET_USER_ACCOUNT', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_USER_ACCOUNT,
        payload: '0x0'
      };

      const expectedState = {
        ...initialState,
        userAccount: '0x0'
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_USER_BALANCE', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_USER_BALANCE,
        payload: 100
      };

      const expectedState = {
        ...initialState,
        userBalance: 100
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_USER_TRANSACTIONS', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_USER_TRANSACTIONS,
        payload: [
          {
            title: 'Trade Title',
            hash: '0x0xxxxx0'
          }
        ]
      };

      const expectedState = {
        ...initialState,
        userTransactions: [
          {
            title: 'Trade Title',
            hash: '0x0xxxxx0'
          }
        ]
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_USER_POSITIONS', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_USER_POSITIONS,
        payload: [
          {
            address: '0x0',
            balance: 10,
            date: '01-01-2018',
            symbol: 'BTC',
            contractDuration: '1-week',
            contractMultiplier: 5
          }
        ]
      };

      const expectedState = {
        ...initialState,
        userPositions: [
          {
            address: '0x0',
            balance: 10,
            date: '01-01-2018',
            symbol: 'BTC',
            contractDuration: '1-week',
            contractMultiplier: 5
          }
        ]
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_USER_TOKENS', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_USER_TOKENS,
        payload: ['0x0xxxxxx0(10/01-01-18)']
      };

      const expectedState = {
        ...initialState,
        userTokens: ['0x0xxxxxx0(10/01-01-18)']
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_USER_ORDERS', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_USER_ORDERS,
        payload: [
          {
            id: '1',
            info: 'info',
            price: 100,
            owned: 'owned',
            address: '0x0',
            balance: 10,
            date: '01-01-2018',
            row: '0x0xxxxx0(owned/01-01-18)'
          }
        ]
      };

      const expectedState = {
        ...initialState,
        userOrders: [
          {
            id: '1',
            info: 'info',
            price: 100,
            owned: 'owned',

            address: '0x0',
            balance: 10,
            date: '01-01-2018',
            row: '0x0xxxxx0(owned/01-01-18)'
          }
        ]
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_CASHOUT_RECEIPT', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_CASHOUT_RECEIPT,
        payload: {
          id: '0x0xxxxxx1',
          amount: 10
        }
      };

      const expectedState = {
        ...initialState,
        cashOut: {
          id: '0x0xxxxxx1',
          amount: 10
        }
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_CASHOUT_ERROR', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_CASHOUT_ERROR,
        payload: 'Cashout Error Message'
      };

      const expectedState = {
        ...initialState,
        cashOutError: 'Cashout Error Message'
      };

      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
