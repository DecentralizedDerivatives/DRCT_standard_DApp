import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as statusActions from '../../actions/statusActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('statusActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  // describe('getUserAccount', () => {
  //   it('should dispatch correct action', () => {
  //     const store = mockStore({});
  //
  //     const actions = store.getActions();
  //     const expectedPayload = {
  //       type: 'SET_PROCESSING',
  //       payload: true
  //     };
  //     expect(actions).toEqual([expectedPayload]);
  //   });
  // });

  describe('showConnectionModal', () => {
    it('should dispatch correct action', () => {
      const store = mockStore({});
      store.dispatch(statusActions.showConnectionModal(true));

      const actions = store.getActions();
      const expectedPayload = {
        type: 'SHOW_CONNECTION_MODAL',
        payload: true
      };
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('checkUserConnection', () => {
    const defaultStatusState = {
      connectStatus: {
        metamask: false,
        network: 0,
        verified: false,
        whiteListed: false
      }
    };

    it('should dispatch correct action', done => {
      const store = mockStore(defaultStatusState);
      store.dispatch(statusActions.checkUserConnection()).then(() => {
        const actions = store.getActions();
        const expectedPayload = {
          type: 'SET_CONNECTION_STATUS',
          payload: {
            metamask: false,
            network: 0,
            verified: true,
            whiteListed: false
          }
        };
        expect(actions[0]).toEqual(expectedPayload);
      });
      done();
    });
  });
});
