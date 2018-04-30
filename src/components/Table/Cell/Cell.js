import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {TableCell} from 'material-ui/Table';

function Cell({style, cellHeight, children, color, fontSize, numeric}) {
  const CustomTableCell = withStyles(theme => ({
    head: {
      color: color || '#8F9193',
      fontSize: 11.6,
    },
    body: {
      borderBottom: 'none',
      borderTop: '2px solid white',
      fontWeight: theme.fonts.weight.veryBold,
      fontSize,
    },
    root: {
      paddingTop: cellHeight || '25px',
      paddingBottom: cellHeight || '25px',
    },
  }))(TableCell);

  return <CustomTableCell numeric={numeric}>{children}</CustomTableCell>;
}

Cell.propTypes = {
  style: PropTypes.object,
  cellHeight: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Cell;
