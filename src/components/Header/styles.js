const button = {
  height: '90px',
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

export default theme => ({
  appBar: {
    backgroundColor: theme.colors.blue,
    height: '90px',
    minWidth: '832px',
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
  button,
  buttonActive: {
    ...button,
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
    marginRight: '20px',
    height: '100%',
  },
  logo: {
    width: '60px',
  },
  link: {
    textDecoration: 'none',
  },
});
