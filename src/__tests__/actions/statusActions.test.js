import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  SET_FETCHING_ERROR,
  SET_CONNECTION_STATUS,
  SHOW_CONNECTION_MODAL
} from '../../actions/types';

import * as statusActions from '../../actions/statusActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

import { web3, Factory } from '../../ethereum';
import FactoryProvider from '../../factoryProvider';

const defaultStatusState = {
  connectStatus: {
    metamask: false,
    network: 0,
    verified: false,
    whiteListed: false
  }
};

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

describe('statusActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('Show Connection Modal', () => {
    const store = mockStore({});
    store.dispatch(statusActions.showConnectionModal(true));

    const actions = store.getActions();
    const expectedActions = {
      type: SHOW_CONNECTION_MODAL,
      payload: true
    };
    expect(actions).toEqual([expectedActions]);
  });

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

  it('connection succeeds whitelist fails', () => {
    const store = mockStore(defaultStatusState);
    web3.eth.getAccounts = jest.fn().mockImplementation(() => ['0x000'])
    const expectedStatus = {
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: true,
        network: 4,
        verified: true,
        whiteListed: false
      }
    };
    return store.dispatch(statusActions.checkUserConnection()).then(() => {
      expect(web3.eth.getAccounts).toHaveBeenCalled()
      expect(FactoryProvider.factories).toHaveBeenCalled()
      expect(Factory.at).toHaveBeenCalled()
      const actions = store.getActions()
      expect(actions).toEqual([expectedStatus]);
    });
  });

  it('connection succeeds whitelisted', () => {
    const store = mockStore(defaultStatusState);
    web3.eth.getAccounts = jest.fn().mockImplementation(() => ['0x000'])
    const whitelisted = { isWhitelisted: jest.fn().mockImplementation(() => true) }
    Factory.at = jest.fn().mockImplementation(() => whitelisted )
    const expectedStatus = {
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: true,
        network: 4,
        verified: true,
        whiteListed: true
      }
    };
    return store.dispatch(statusActions.checkUserConnection()).then(() => {
      expect(web3.eth.getAccounts).toHaveBeenCalled()
      expect(FactoryProvider.factories).toHaveBeenCalled()
      expect(Factory.at).toHaveBeenCalled()
      const actions = store.getActions()
      expect(actions).toEqual([expectedStatus]);
    });
  });
})

// jest.mock('../../ethereum', () => {
//   return { web3: { eth: {
//     // getAccounts: jest.fn().mockImplementation(() => { throw new Error('Intentional Error') }),
//     getAccounts: jest.fn().mockImplementation(() => []),
//     net: {
//       getId: jest.fn().mockImplementation(() => 4),
//     }
//   }}}
// })

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
