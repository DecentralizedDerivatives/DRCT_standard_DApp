import PriceChart from '../../components/PriceChart';

import mockAxios from 'jest-mock-axios';
import Highcharts from 'highcharts/highstock';
import { getPriceChartData } from '../../actions/dataActions';

mockAxios.get.mockImplementation(() => Promise.resolve());
jest.mock('highcharts/highstock');
jest.mock('../../actions/dataActions');
getPriceChartData.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore(FIXTURE);

  const props = { store, ...overrides };

  const wrapper = shallow(<PriceChart {...props} />).dive();
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
  };
}

describe('<PriceChart />', () => {
  afterEach(() => {
    Highcharts.setOptions.mockClear();
    Highcharts.stockChart.mockClear();
  });

  it('renders the component', done => {
    const { wrapper } = setup();

    setImmediate(() => {
      expect(Highcharts.setOptions.mock.calls).toMatchSnapshot();
      expect(Highcharts.stockChart.mock.calls).toMatchSnapshot();

      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  it('handles chart update error', done => {
    const { instance } = setup();

    setImmediate(() => {
      instance.chart.series[0].update.mockImplementationOnce(() => {
        throw new Error('error');
      });
      instance.updateChart('min');

      done();
    });
  });

  it('handles chart update', done => {
    const { instance } = setup();

    setImmediate(() => {
      const options = Highcharts.stockChart.mock.calls[0][1];
      const update = instance.chart.series[0].update;

      options.rangeSelector.buttons.forEach(button => {
        update.mockClear();

        button.events.click();

        expect(update.mock.calls).toMatchSnapshot();
      });

      done();
    });
  });

  it('handles currency change', done => {
    const { wrapper } = setup();

    wrapper
      .find('.pricechart__dropdown')
      .simulate('change', { target: { value: 'ETH' } });

    setImmediate(() => {
      expect(getPriceChartData.mock.calls).toMatchSnapshot();

      done();
    });
  });

  it('renders empty component', async () => {
    const { wrapper } = setup({ store: initStore() });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders component with error', async () => {
    Highcharts.stockChart.mockImplementationOnce(() => {
      throw new Error('error');
    });

    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
