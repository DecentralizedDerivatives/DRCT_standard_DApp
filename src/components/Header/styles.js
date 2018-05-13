const button = {
  height: '80px',
  borderRight: '1px solid #27597E',
  padding: '0px 30px',
  borderRadius: '0px',
};

const text = theme => ({
  color: theme.colors.white,
  fontSize: theme.fonts.size.header,
  fontWeight: theme.fonts.weight.medium,
  letterSpacing: '1px',
});

const lens = {
  position: 'relative',
  marginLeft: '6px',
  top: '2px',
  height: '13px',
  width: '13px',
};

const onMobileTheme = (theme, css) => ({
  [theme.breakpoints.down('sm')]: {
    ...css,
  },
});

const hideSmall = theme => ({
  ...onMobileTheme(theme, {display: 'none'}),
});

export default theme => ({
  appBar: {
    backgroundColor: theme.colors.blue,
    height: '80px',
    minWidth: '800px',
    ...onMobileTheme(theme, {minWidth: '400px'}),
  },
  menuContainer: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    display: 'flex',
    height: '80px',
  },
  menuButton: {
    display: 'flex',
    alignSelf: 'center',
    marginLeft: '10px',
  },
  menuIcon: {
    width: '30px',
    height: '30px',
  },
  linkText: {
    ...text(theme),
  },
  linkTextActive: {
    ...text(theme),
    color: theme.colors.blue,
  },
  connected: {
    ...text(theme),
  },
  button: {
    ...button,
    ...hideSmall(theme),
  },
  buttonActive: {
    ...button,
    ...hideSmall(theme),
    backgroundColor: theme.colors.white,
    '&:hover': {
      backgroundColor: theme.colors.white,
    },
  },
  container: {
    height: '100%',
  },
  lens: {
    ...lens,
    fill: theme.colors.green,
  },
  lensOff: {
    ...lens,
    fill: theme.colors.red,
  },
  connectedContainer: {
    height: '80px',
    marginRight: '20px',
  },
  link: {
    textDecoration: 'none',
    ...hideSmall(theme),
  },
});
