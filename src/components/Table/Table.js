import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import MaterialTable, {TableBody, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Cell from './Cell';
import styles from './styles';
import {colors} from '../../styles/global';

const currencies = ['BTC', 'KRW'];

function Table({classes, titles, rows, tableWidth, ...props}) {
  // Cells: Last elements are right aligned

  // Set first title with black font
  const createTitles = () =>
    titles.map((title, i) => (
      <Cell
        numeric={i === titles.length - 1}
        props={props}
        color={i === 0 ? colors.black : null}
        key={title}
      >
        {title}
      </Cell>
    ));

  const createRows = () =>
    rows.map((row, i) => {
      const tableCells = row.map((value, j) => {
        const key = `${value}-${i}-${j}`;
        const numeric = j === row.length - 1;

        let cell = (
          <Cell numeric={numeric} props={props} key={key}>
            {value}
          </Cell>
        );

        // Check for currency types
        if (j > 1) {
          const currency = currencies.filter(type => value.includes(type));

          if (currency.length) {
            cell = (
              <Cell numeric={numeric} props={props} key={key}>
                {value.replace(currency, '')}
                <span className={classes.currency}>{currency[0]}</span>
              </Cell>
            );
          }
        }

        return cell;
      });

      return (
        <TableRow hover onClick={props.clickFunction} className={classes.row} key={i}>
          {tableCells}
        </TableRow>
      );
    });

  return (
    <Paper className={classes.root} style={{width: tableWidth}}>
      <MaterialTable className={classes.table}>
        <TableHead className={classes.row}>
          <TableRow>{createTitles()}</TableRow>
        </TableHead>
        <TableBody>{createRows()}</TableBody>
      </MaterialTable>
    </Paper>
  );
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  tableWidth: PropTypes.string,
  cellHeight: PropTypes.string,
  clickFunction: PropTypes.func.isRequired
};

export default withStyles(styles)(Table);
