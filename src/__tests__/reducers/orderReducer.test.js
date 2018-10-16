import orderReducer from '../../reducers/orderReducer';
import {
  SET_ORDER_DETAILS,
  SET_BUY_ORDER_RECEIPT,
  SET_BUY_ORDER_ERROR,
  SET_UNLIST_ORDER_RECEIPT,
  SET_UNLIST_ORDER_ERROR,
  SET_LIST_ORDER,
  SET_LIST_ORDER_ERROR,
  SET_LIST_ORDER_APPROVED,
  SET_LIST_ORDER_APPROVE_ERROR
} from '../../actions/types';

describe('orderReducer', () => {
  const initialState = {
    orderDetails: '',
    buy: {
      id: '',
      orderId: 0
    },
    buyOrderError: null,
    list: {
      id: '',
      token: '',
      price: 0,
      tokenAmount: '',
      approved: false
    },
    listOrderError: null,
    listOrderApproveError: null,
    unlist: {
      id: '',
      orderId: ''
    },
    unlistOrderError: null
  };

  describe('initialState', () => {
    it('should set default state', () => {
      const state = orderReducer(undefined, { type: '@@INIT' });

      expect(state).toEqual(initialState);
    });
  });

  describe('SET_ORDER_DETAILS', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_ORDER_DETAILS,
        payload: ['0x0xxxxxx0(10/01-01-18)']
      };

      const expectedState = {
        ...initialState,
        orderDetails: ['0x0xxxxxx0(10/01-01-18)']
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_BUY_ORDER_RECEIPT', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_BUY_ORDER_RECEIPT,
        payload: {
          id: '0x00x0xxxxxx0',
          orderId: '0x0xxx'
        }
      };

      const expectedState = {
        ...initialState,
        buy: {
          id: '0x00x0xxxxxx0',
          orderId: '0x0xxx'
        }
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_BUY_ORDER_ERROR', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_BUY_ORDER_ERROR,
        payload: 'Buy Order Error Message'
      };

      const expectedState = {
        ...initialState,
        buyOrderError: 'Buy Order Error Message'
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_UNLIST_ORDER_RECEIPT', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_UNLIST_ORDER_RECEIPT,
        payload: {
          id: '0x00x0xxxxxx0',
          orderId: '0x0xxx'
        }
      };

      const expectedState = {
        ...initialState,
        unlist: {
          id: '0x00x0xxxxxx0',
          orderId: '0x0xxx'
        }
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_UNLIST_ORDER_ERROR', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_UNLIST_ORDER_ERROR,
        payload: 'Unlist Order Error Message'
      };

      const expectedState = {
        ...initialState,
        unlistOrderError: 'Unlist Order Error Message'
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_LIST_ORDER', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_LIST_ORDER,
        payload: {
          id: '0x00x0xxxxxx0',
          token: '0x0xxx',
          price: 10,
          amount: 0.5
        }
      };

      const expectedState = {
        ...initialState,
        list: {
          ...initialState.list,
          id: '0x00x0xxxxxx0',
          token: '0x0xxx',
          price: 10,
          amount: 0.5
        }
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_LIST_ORDER_ERROR', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_LIST_ORDER_ERROR,
        payload: 'List Order Error Message'
      };

      const expectedState = {
        ...initialState,
        listOrderError: 'List Order Error Message'
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_LIST_ORDER_APPROVED', () => {
    const _initialState = {
      ...initialState,
      list: {
        ...initialState.list,
        id: '0x00x0xxxxxx0',
        token: '0x0xxx',
        price: 10,

        approved: false
      }
    };

    it('returns the correct state', () => {
      const action = {
        type: SET_LIST_ORDER_APPROVED,
        payload: {
          token: '0x0xxx',
          tokenAmount: 0.1,
          approved: true,
        }
      };

      const expectedState = {
        ..._initialState,
        list: {
          approved: true,
          id: '0x00x0xxxxxx0',
          price: 10,
          token: '0x0xxx',
          tokenAmount: 0.1
        }
      };

      const state = orderReducer(_initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_LIST_ORDER_APPROVE_ERROR', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_LIST_ORDER_APPROVE_ERROR,
        payload: 'List Order Approve Error'
      };

      const expectedState = {
        ...initialState,
        listOrderApproveError: 'List Order Approve Error'
      };

      const state = orderReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
