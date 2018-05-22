const width = '325px';

export default theme => ({
  paper: {
    borderRadius: '5px',
    position: 'fixed',
    top: '20%',
    outline: 'none',
  },
  dialogContent: {
    width,
    padding: '30px',
  },
  approvalContainer: {
    width,
    paddingBottom: '5px',
  },
  listContainer: {
    width,
    padding: '15px 30px 30px 30px',
  },
  line: {
    border: `0.5px solid ${theme.colors.lightGray}`,
    marginBottom: '15px',
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
  txId: {
    fontSize: '16px',
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.blue,
    '&:hover': {
      backgroundColor: theme.colors.lightBlue,
    },
  },
  buttonDisabled: {
    width: '100%',
    backgroundColor: theme.colors.lightBlue,
  },
  buttonText: {
    color: theme.colors.white,
  },
  waiting: {
    fontWeight: theme.fonts.weight.light,
    fontSize: theme.fonts.size.inputTitle,
    color: theme.colors.gray,
    position: 'relative',
    float: 'right',
  },
  progress: {
    marginLeft: '10px',
    color: theme.colors.gray,
  },
});
