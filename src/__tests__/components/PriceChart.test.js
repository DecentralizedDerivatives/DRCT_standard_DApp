import mockAxios from 'jest-mock-axios';
import Highcharts from 'highcharts/highstock';

import PriceChart from '../../components/PriceChart';

mockAxios.get.mockImplementation(() => Promise.resolve());

Highcharts.setOptions = jest.fn();
Highcharts.stockChart = jest.fn();

// TODO: increase coverage, setup
describe('<PriceChart />', () => {
  it('renders the component', async () => {
    const wrapper = shallow(<PriceChart store={initFixtureStore()} />).dive();

    wrapper
      .find('.pricechart__dropdown')
      .simulate('change', { target: { value: 'ETH' } });

    expect(Highcharts.setOptions.calls).toMatchSnapshot();
    expect(Highcharts.stockChart.calls).toMatchSnapshot();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty component', async () => {
    const wrapper = shallow(<PriceChart store={initStore()} />).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
