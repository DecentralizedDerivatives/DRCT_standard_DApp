import React, { Component } from 'react';
import "./style.css";
/*React Components*/
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Highcharts from 'highcharts/highstock';
import api from '../../api';
import theme from "./theme.js";
require('highcharts/modules/exporting')(Highcharts);

// Apply the theme
Highcharts.theme = theme;
Highcharts.setOptions(Highcharts.theme);

class PriceChart extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
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
            valueDecimals: 2,
          },
          enableMouseTracking: false,
        },
      ],
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.fetchData(event.target.value.toLowerCase());
  };

  render() {
    return (
      <div className="price-chart">
        <div className="price-chart-item">
            <select onChange={this.handleChange} className="price-chart-dropdown">
              {PriceChart.currencies.map((item)=>{
                return <option className="price-chart-dropdown-item" name={item} value={item}>{item}</option> 
              })}
            </select>
          <div className="price-chart-item">
            <div className="price-chart-item" id="container" />
          </div>
        </div>
      </div>
    );
  }
}

export default PriceChart;
