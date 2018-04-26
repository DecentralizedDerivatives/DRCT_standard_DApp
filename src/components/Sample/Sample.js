import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import styles from './styles';
import Table from "../Table";

const Sample =({ classes }) =>
  (
    <Grid container className={classes.container} direction='row' alignItems='stretch' justify='center'>
      <Grid item className={classes.item}>
        <Table 
          titles={['Order Book', 'Amount', 'Sum', 'Size', 'Bid', 'Expiration']}
          rows={[
            ['One-week BTC/USD', '5 Ether', '1.9304619BTC', '1.9304619BTC', '8,930,500KRW', '5/28/2018'],
            ['One-week BTC/USD', '5 Ether', '1.9304619BTC', '1.9304619BTC', '8,930,500KRW', '5/30/2018'],
            ['One-week BTC/USD', '5 Ether', '1.9304619BTC', '1.9304619BTC', '8,930,500KRW', '6/2/2018'],
          ]}
        />
      </Grid>

      <Grid item className={classes.item}>
        <Table 
          titles={['My Transactions', 'Type', 'Amount', 'Date']}
          rows={[
            ['DRCT Exchange', 'Trade/Buy', '.1 Ether', '6/1/2018'],
            ['One-week BTC/USD', 'Trade/Buy', '5 Ether', '5/30/2018'],
            ['DRCT Exchange', 'Trade/Buy', '.3 Ether', '5/28/2018'],
          ]}
          tableWidth='650px'
        />
      </Grid>
      

      <Grid item className={classes.item}>
        <Table 
          titles={['Recent Trades', 'Volume', 'Price']}
          rows={[
            ['17:51:27', '0.00287487', '8,932,000'],
            ['17:51:27', '0.00287487', '8,932,000'],
            ['17:51:27', '0.00287487', '8,932,000'],
            ['17:51:27', '0.00287487', '8,932,000'],
            ['17:51:27', '0.00287487', '8,932,000'],
          ]}
          tableWidth='400px'
          cellHeight='15px'
          fontSize='12px'
        />
      </Grid>

    </Grid>
  );

Sample.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Sample);
