export default theme => ({
  paper: {
    borderRadius: '5px',
    position: 'fixed',
    top: '20%',
    outline: 'none',
  },
  dialogContent: {
    width: '325px',
    padding: '30px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  title: {
    fontWeight: theme.fonts.weight.bold,
    fontSize: theme.fonts.size.inputTitle,
  },
  duration: {
    width: '150px',
  },
  currency: {
    width: '150px',
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.blue,
    '&:hover': {
      backgroundColor: theme.colors.lightBlue,
    }
  },
  buttonText: {
    color: theme.colors.white,
  },
});
