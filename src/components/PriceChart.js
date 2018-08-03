import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import { getPriceChartData } from '../actions/dataActions';
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

  fetchData = async type => {
    await this.props.getPriceChartData(type);

    if (this.props.pricechart) {
      this.createChart(type);
    }


  };

  createChart = type => {
    try {
      Highcharts.stockChart('container', {
        series: [
          {
            data: this.props.pricechart,
            tooltip: {
              valueDecimals: 2
            },
            enableMouseTracking: false
          }
        ]
      });
    } catch (e) {
      console.log('Error creating chart', e)
    }
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

const mapStateToProps = state => ({
  pricechart: state.data.pricechart
});

export default connect(mapStateToProps, { getPriceChartData })(PriceChart);
