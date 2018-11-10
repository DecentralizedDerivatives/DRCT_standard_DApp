jest.mock('highcharts/modules/exporting');

export default {
  setOptions: jest.fn(),
  stockChart: jest.fn(() => {
    return { series: [{ update: jest.fn() }] };
  }),
};
