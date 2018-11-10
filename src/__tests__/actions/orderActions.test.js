import * as actionTypes from '../../actions/types';
import * as orderActions from '../../actions/orderActions';

jest.mock('../../ethereum');
jest.mock('../../factoryProvider');

const store = mockStore({});

describe('orderActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('Handles empty order id', () => {
    const store = mockStore({});
    store.dispatch(orderActions.getOrderDetails());
    const actions = store.getActions();
    const expectedActions = {
      type: actionTypes.SET_ORDER_DETAILS,
      payload: '',
    };
    expect(actions).toEqual([expectedActions]);
  });
});
