export default {
  rangeSelector: {
    inputEnabled: false,
    align: 'right',
    buttons: [
      {
        type: 'month',
        count: 1,
        text: '1m',
      },
      {
        type: 'all',
        count: 3,
        text: '3m',
      },
    ],
  },

  exporting: {
    enabled: false,
  },

  navigator: {
    enabled: false,
  },

  colors: [
    '#30AD63', //line
  ],
  chart: {
    backgroundColor: '#EEF2F5',
    style: {
      fontFamily: "'Unica One', sans-serif",
    },
  },
  subtitle: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase',
    },
  },
  xAxis: {
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    tickWidth: 0,
    lineWidth: 0,
    labels: {
      enabled: false
    },
  },
  yAxis: {
    gridLineColor: 'white',
    labels: {
      align: 'left',
      style: {
        color: 'gray',
      },
    },
  },
  scrollbar: {
    enabled: false
  },
};
