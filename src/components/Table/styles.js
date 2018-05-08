export default theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    backgroundColor: '#EEF2F5',
  },
  title: {
    color: theme.colors.black,
  },
  currency: {
    fontSize: 10,
    fontWeight: theme.fonts.weight.veryBold,
  },
  button : {
    float:'left', /* Float the buttons side by side */
    background:'none',
    border:'none', 
    padding:0,
    cursor: 'pointer',
  },
});
