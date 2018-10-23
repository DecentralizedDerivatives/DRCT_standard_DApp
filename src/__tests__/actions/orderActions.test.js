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
import { Factory, Exchange, DRCT, UserContract } from '../../ethereum';
import FactoryProvider from '../../factoryProvider';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

jest.unmock('../../ethereum')
jest.mock('../../ethereum', () => {
  const mockFactory = { isWhitelisted: jest.fn().mockImplementation(() => false) }
  return {
    web3: {
      eth: {
        getAccounts: jest.fn(),
        net: {
          getId: jest.fn().mockImplementation(() => 4),
        }
      }
    },
    Factory: {
      at: jest.fn().mockImplementation(() => mockFactory )
    }
  }
})

jest.unmock('../../factoryProvider')
jest.mock('../../factoryProvider', () => {
  return {
    factories: jest.fn().mockImplementation(() => [ {address: '0x000'} ])
  }
})

describe('orderActions', () => {
  afterEach(() => {
    store.clearActions();
  });

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

  it('sendSendFundsOrder Fails', () => {
    const store = mockStore({});
    const processingStartStatus = { type: SET_PROCESSING, payload: true }
    const processingStopStatus = { type: SET_PROCESSING, payload: false }
    const newContractMock = { currency: 'BTC', amount: 99.99 }
    const accountMock = {}
    return store.dispatch(orderActions.sendSendFundsOrder(newContractMock, accountMock))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual(processingStartStatus);
        expect(actions[1].type).toEqual(SET_SEND_FUNDS_ERROR);
        expect(actions[2]).toEqual(processingStopStatus);
    });
  });

});
