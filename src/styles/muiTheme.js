import {createMuiTheme} from 'material-ui/styles';
import {colors} from './global';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
  typography: {
    fontFamily: 'IBM Plex Sans',
  },
  fonts: {
    size: {
      header: '16px',
      inputTitle: '13px',
    },
    weight: {
      light: 300,
      medium: 400,
      bold: 500,
      veryBold: 600,
    },
  },
  colors,
});

export default theme;
