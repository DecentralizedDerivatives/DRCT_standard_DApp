const onMobileTheme = (theme, css) => ({
  [theme.breakpoints.down('sm')]: {
    ...css,
  },
});

export default theme => ({
  main: {
    height: '100vh',
    ...onMobileTheme(theme, {maxWidth: '800px'}),
    border: '1px solid black',
  },
});
