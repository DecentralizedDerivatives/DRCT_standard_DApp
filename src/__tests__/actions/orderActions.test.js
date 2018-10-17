import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  SET_ORDER_DETAILS,
  SET_BUY_ORDER_RECEIPT,
  SET_BUY_ORDER_ERROR,
  SET_UNLIST_ORDER_RECEIPT,
  SET_UNLIST_ORDER_ERROR,
  SET_CONTRACT_CREATED,
  SET_CONTRACT_ERROR,
  SET_CONTRACT_FUNDED,
  SET_SEND_FUNDS_ERROR,
  SET_LIST_ORDER,
  SET_LIST_ORDER_ERROR,
  SET_LIST_ORDER_APPROVED,
  SET_LIST_ORDER_APPROVE_ERROR,
  SET_PROCESSING,
  SET_FETCHING_ERROR
} from '../../actions/types';

import * as orderActions from '../../actions/orderActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('orderActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  describe('getOrderDetails', () => {
    it('Handles empty order id', () => {
      const store = mockStore({});
      store.dispatch(orderActions.getOrderDetails());
      const actions = store.getActions();
      const expectedActions = {
        type: SET_ORDER_DETAILS,
        payload: ''
      };
      expect(actions).toEqual([expectedActions]);
    });
    // it('Handles fake order id', () => {
    //   const store = mockStore({});
    //   store.dispatch(orderActions.getOrderDetails(1));
    //   const actions = store.getActions();
    //   const expectedActions = {
    //     type: SET_FETCHING_ERROR
    //   };
    //   expect(actions).toEqual([expectedActions]);
    // });
  });

  // describe('showConnectionModal', () => {
  //   it('should dispatch correct action', () => {
  //     const store = mockStore({});
  //     store.dispatch(statusActions.showConnectionModal(true));
  //
  //     const actions = store.getActions();
  //     const expectedActions = {
  //       type: 'SHOW_CONNECTION_MODAL',
  //       payload: true
  //     };
  //     expect(actions).toEqual([expectedActions]);
  //   });
  // });
  //
  // describe('checkUserConnection', () => {
  //   const defaultStatusState = {
  //     connectStatus: {
  //       metamask: false,
  //       network: 0,
  //       verified: false,
  //       whiteListed: false
  //     }
  //   };
  //
  //   it('should dispatch correct action', done => {
  //     const store = mockStore(defaultStatusState);
  //     store.dispatch(statusActions.checkUserConnection()).then(() => {
  //       const actions = store.getActions();
  //       const expectedActions = {
  //         type: 'SET_CONNECTION_STATUS',
  //         payload: {
  //           metamask: false,
  //           network: 0,
  //           verified: true,
  //           whiteListed: false
  //         }
  //       };
  //       expect(actions[0]).toEqual(expectedActions);
  //     });
  //     done();
  //   });
  // });
});
