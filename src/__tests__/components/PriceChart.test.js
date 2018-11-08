import mockAxios from 'jest-mock-axios';
import Highcharts from 'highcharts/highstock';

import PriceChart from '../../components/PriceChart';

mockAxios.get.mockImplementation(() => Promise.resolve());

jest.mock('highcharts/highstock');

// TODO: increase coverage, setup
describe('<PriceChart />', () => {
  it('renders the component', done => {
    const wrapper = shallow(<PriceChart store={initFixtureStore()} />).dive();

    wrapper
      .find('.pricechart__dropdown')
      .simulate('change', { target: { value: 'ETH' } });

    setImmediate(() => {
      expect(Highcharts.setOptions.mock.calls).toMatchSnapshot();
      expect(Highcharts.stockChart.mock.calls).toMatchSnapshot();

      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  it('renders empty component', async () => {
    const wrapper = shallow(<PriceChart store={initStore()} />).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
