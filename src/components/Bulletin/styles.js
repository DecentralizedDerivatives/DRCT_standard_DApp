var button = {
  height: '50px',
  border: '1px solid #27597E',
  padding: '0px 30px',
  borderRadius: '0px',
};


export default theme => ({
  item: {
    width: '1000px',
    marginTop: '25px',
  },
  container: {
    marginBottom: '25px',
  },
  button,
  buttonActive: {
    ...button,
    backgroundColor: theme.colors.blue,
    '&:hover': {
      backgroundColor: theme.colors.blue,
    },
  },
});
