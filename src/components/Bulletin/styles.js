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

export default theme => ({
  item: {
    width: '90%',
    marginTop: '25px',
  },
  container: {
    marginBottom: '25px',
  },
  button: {
    backgroundColor:theme.colors.white,
    border: '1px solid #27597E',
    color: 'white',
    width: 300,
    height: 45,
    borderBottom:'1px solid #27597E',
    borderWidth: 0,
    borderRadius: 5,
    ...text(theme),
  },
  buttonActive: {
    ...button,
    ...text(theme),
    backgroundColor: theme.colors.white,
    '&:hover': {
      backgroundColor: theme.colors.white,
    },
  },
});
