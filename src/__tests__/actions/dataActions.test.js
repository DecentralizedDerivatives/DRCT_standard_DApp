import * as dataActions from '../../actions/dataActions';
import api from '../../api';

jest.mock('../../api', () => {
  return { eth: { get: jest.fn() } };
});

const store = mockStore({});

describe('dataActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('gets data', async () => {
    await store.dispatch(dataActions.getPriceChartData('eth'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('handles error', async () => {
    api.eth.get.mockImplementationOnce(() => {
      throw new Error('error');
    });
    await store.dispatch(dataActions.getPriceChartData('eth'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
