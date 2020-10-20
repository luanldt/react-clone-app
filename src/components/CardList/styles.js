const styles = (theme) => ({
  root: {
    backgroundColor: '#ebecf0',
    maxHeight: '100%',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(1) + 1,
    maxHeight: '100%',
    height: '100%',
    flex: '1 1 auto',
  },
  contentQuickCard: {
    padding: theme.spacing(1) + 'px!important',
  },
});

export default styles;
