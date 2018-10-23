import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import { getPriceChartData } from '../actions/dataActions';
require('highcharts/modules/exporting')(Highcharts);

Highcharts.setOptions({
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
      enabled: true,
    },
    type: 'datetime',
    endOnTick: true,
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
    enabled: false,
  },
});

class PriceChart extends Component {
  constructor() {
    super();
    this.state = {
      currency: 'BTC',
    };
  }

  static currencies = ['BTC', 'ETH'];

  componentDidMount() {
    this.fetchData('btc');
  }

  fetchData = async type => {
    await this.props.getPriceChartData(`${type}Minute`);
    this.setState({
      minutelyData: this.props.pricechart,
    });

    await this.props.getPriceChartData(type);
    this.setState({
      hourlyData: this.props.pricechart,
    });

    if (this.state.minutelyData && this.state.hourlyData) {
      this.createChart(type);
    }
  };

  updateChart = type => {
    try {
      this.chart.series[0].update({
        data: type === 'min'
        ? this.state.minutelyData
        : this.state.hourlyData,
      });
    } catch (e) {
      console.log('Error trying to update chart: ', e);
    }
  };
  createChart = type => {
    try {
      this.chart = Highcharts.stockChart('container', {
        rangeSelector: {
          allButtonsEnabled: true,
          inputEnabled: false,
          align: 'right',
          buttons: [
            {
              type: 'minute',
              count: 60,
              text: '1m',
              dataGrouping: {
                forced: true,
                units: [['minute', [1]]],
              },
              events: {
                click: () => this.updateChart('min'),
              },
            },
            {
              type: 'hour',
              count: 6,
              text: '6h',
              dataGrouping: {
                forced: true,
                units: [['minute', [30]]],
              },
              events: {
                click: () => this.updateChart('hour'),
              },
            },
            {
              type: 'month',
              count: 1,
              text: '1M',
              dataGrouping: {
                enabled: true,
                forced: false,
                units: [['hour', [4]]],
              },
              events: {
                click: () => this.updateChart('hour'),
              },
            },
            {
              type: 'month',
              count: 3,
              text: '3M',
              dataGrouping: {
                enabled: true,
                forced: true,
                units: [['day', [1]]],
              },
              events: {
                click: () => this.updateChart('hour'),
              },
            },
          ],
          selected: 3,
        },
        tooltip: {
          backgroundColor: '#eceeef',
          animation: true,
          shadow: true,
        },
        series: [
          {
            name: this.state.currency,
            data: this.state.hourlyData,
            tooltip: {
              valueDecimals: 2,
            },
            enableMouseTracking: true,
          },
        ],
      });
    } catch (e) {
      console.log('Error creating chart', e);
    }
  };

  handleChange = event => {
    this.setState({ currency: event.target.value });
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

const mapStateToProps = state => ({
  pricechart: state.data.pricechart,
});

export default connect(
  mapStateToProps,
  {getPriceChartData}
)(PriceChart);
