import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import api from '../api';
require('highcharts/modules/exporting')(Highcharts);

Highcharts.setOptions({
  rangeSelector: {
    inputEnabled: false,
    align: 'right',
    buttons: [
      {
        type: 'month',
        count: 1,
        text: '1m'
      },
      {
        type: 'all',
        count: 3,
        text: '3m'
      }
    ]
  },

  exporting: {
    enabled: false
  },

  navigator: {
    enabled: false
  },

  colors: [
    '#30AD63' //line
  ],
  chart: {
    backgroundColor: '#EEF2F5',
    style: {
      fontFamily: "'Unica One', sans-serif"
    }
  },
  subtitle: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase'
    }
  },
  xAxis: {
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    tickWidth: 0,
    lineWidth: 0,
    labels: {
      enabled: false
    }
  },
  yAxis: {
    gridLineColor: 'white',
    labels: {
      align: 'left',
      style: {
        color: 'gray'
      }
    }
  },
  scrollbar: {
    enabled: false
  }
});

class PriceChart extends Component {
  constructor() {
    super();
    this.state = {
      currency: 'BTC'
    };
  }

  static currencies = ['BTC', 'ETH'];

  componentDidMount() {
    this.fetchData('btc');
  }

  // TODO:Move into action
  fetchData = async type => {
    const data = await api[type].get();
    this.setState({ data }, () => {
      this.createChart();
    });
  };

  createChart = type => {
    Highcharts.stockChart('container', {
      series: [
        {
          data: this.state.data,
          tooltip: {
            valueDecimals: 2
          },
          enableMouseTracking: false
        }
      ]
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.fetchData(event.target.value.toLowerCase());
  };

  render() {
    return (
      <div className="pricechart__chart">
        <div className="pricechart__item">
          <select onChange={this.handleChange} className="pricechart__dropdown">
            {PriceChart.currencies.map((item, index) => {
              return (
                <option
                  key={'price-chart' + index}
                  className="pricechart__dropdown-item"
                  name={item}
                  value={item}
                >
                  {item}
                </option>
              );
            })}
          </select>
          <div className="pricechart__item">
            <div className="pricechart__item" id="container" />
          </div>
        </div>
      </div>
    );
  }
}

export default PriceChart;
