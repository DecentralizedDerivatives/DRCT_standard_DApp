import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  SET_FETCHING_ERROR,
  SET_CONNECTION_STATUS,
  SHOW_CONNECTION_MODAL
} from '../../actions/types';
import * as statusActions from '../../actions/statusActions';
// jest.unmock('../../ethereum')
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

import { web3, Factory } from '../../ethereum';

const defaultStatusState = {
  connectStatus: {
    metamask: false,
    network: 0,
    verified: false,
    whiteListed: false
  }
};

jest.mock('../../ethereum', () => {
  return {
    web3: {
      eth: {
        getAccounts: jest.fn(),
        net: {
          getId: jest.fn().mockImplementation(() => 4),
        }
      }
    }
  }
})

store.clearActions();

it('should dispatch correct action', () => {
  const store = mockStore({});
  store.dispatch(statusActions.showConnectionModal(true));

  const actions = store.getActions();
  const expectedActions = {
    type: SHOW_CONNECTION_MODAL,
    payload: true
  };
  expect(actions).toEqual([expectedActions]);
});

store.clearActions();

it('connection fails', () => {
  const store = mockStore(defaultStatusState);
  web3.eth.getAccounts = jest.fn().mockImplementation(() => { throw new Error('Intentional Error') })
  const expectedStatus = {
    type: SET_CONNECTION_STATUS,
    payload: {
      metamask: false,
      network: 0,
      verified: true,
      whiteListed: false
    }
  };
  return store.dispatch(statusActions.checkUserConnection()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(expectedStatus);
    expect(actions[1].type).toEqual(SET_FETCHING_ERROR)
  });
});

store.clearActions();

// jest.mock('../../ethereum', () => {
//   return { web3: { eth: {
//     // getAccounts: jest.fn().mockImplementation(() => { throw new Error('Intentional Error') }),
//     getAccounts: jest.fn().mockImplementation(() => []),
//     net: {
//       getId: jest.fn().mockImplementation(() => 4),
//     }
//   }}}
// })

it('connection succeeds no accounts', () => {
  const store = mockStore(defaultStatusState);
  web3.eth.getAccounts = jest.fn().mockImplementation(() => [])
  const expectedStatus = {
    type: SET_CONNECTION_STATUS,
    payload: {
      metamask: false,
      network: 4,
      verified: true,
      whiteListed: false
    }
  };
  return store.dispatch(statusActions.checkUserConnection()).then(() => {
    expect(web3.eth.getAccounts).toHaveBeenCalled()
    const actions = store.getActions()
    expect(actions).toEqual([expectedStatus]);
  });
});

store.clearActions();

// describe('statusActions', () => {
//   afterEach(() => {
//     store.clearActions();
//   });
//
//   describe('showConnectionModal', () => {
//
//   });
//
//   describe('checkUserConnection', () => {
    // it('connection fails', () => {
    //   const store = mockStore(defaultStatusState);
    //   const expectedStatus = {
    //     type: SET_CONNECTION_STATUS,
    //     payload: {
    //       metamask: false,
    //       network: 0,
    //       verified: true,
    //       whiteListed: false
    //     }
    //   };
    //   return store.dispatch(statusActions.checkUserConnection()).then(() => {
    //     const actions = store.getActions()
    //     expect(actions[0]).toEqual(expectedStatus);
    //     expect(actions[1].type).toEqual(SET_FETCHING_ERROR)
    //   });
    // });

//   });
// });
