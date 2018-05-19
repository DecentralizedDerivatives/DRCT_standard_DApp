import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Highcharts from 'highcharts/highstock';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Dropdown from '../Dropdown';
import theme from './theme';
import styles from './styles';
import api from '../../api';

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
    const { classes } = this.props;

    return (
      <Paper className={classes.container}>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justify="flex-end"
          className={classes.grid}
        >
          <Grid item className={classes.item}>
            <Dropdown
              menuItems={PriceChart.currencies}
              value={this.state.currency}
              name="currency"
              onChange={this.handleChange}
              className={classes.dropdown}
              menuItemClass={classes.menuItem}
              disableUnderline={true}
              selectBackground="none"
            />
          </Grid>
          <Grid item>
            <div className={classes.container} id="container" />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(PriceChart);
