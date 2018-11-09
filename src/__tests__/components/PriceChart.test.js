// TODO: check
import PriceChart from '../../components/PriceChart';

import mockAxios from 'jest-mock-axios';
import Highcharts from 'highcharts/highstock';

mockAxios.get.mockImplementation(() => Promise.resolve());
jest.mock('highcharts/highstock');

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<PriceChart {...props} />).dive();
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
  };
}

describe('<PriceChart />', () => {
  it('renders the component', done => {
    const { wrapper, instance } = setup({ store: initFixtureStore() });

    wrapper
      .find('.pricechart__dropdown')
      .simulate('change', { target: { value: 'ETH' } });

    setImmediate(() => {
      expect(Highcharts.setOptions.mock.calls).toMatchSnapshot();
      expect(Highcharts.stockChart.mock.calls).toMatchSnapshot();

      const options = Highcharts.stockChart.mock.calls[0][1];

      options.rangeSelector.buttons.forEach(button => {
        button.events.click();
      });

      expect(wrapper).toMatchSnapshot();

      instance.chart.series[0].update.mockImplementationOnce(() => {
        throw new Error('error');
      });
      instance.updateChart('min');

      done();
    });
  });

  it('renders empty component', async () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders component with error', async () => {
    Highcharts.stockChart.mockImplementationOnce(() => {
      throw new Error('error');
    });

    const { wrapper } = setup({ store: initFixtureStore() });
    expect(wrapper).toMatchSnapshot();
  });
});
