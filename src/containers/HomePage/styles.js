const styles = (theme) => ({
  root: {},
  gridListContainer: {
    backgroundImage:
      // eslint-disable-next-line quotes
      "url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/3e0ad1e0608ac348dbc1b02b3253d5ed/photo-1588021096284-22bd519a01ee.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    margin: 0 + '!important',
    flexWrap: 'nowrap',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gridList: {
    height: 'auto!important',
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
  cardContent: {
    padding: theme.spacing(1) + 'px!important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainerContent: {
    padding: theme.spacing(1),
  },
  cardContainer: {
    background: '#DDD',
  },
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paperInput: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
  cardQuickAdd: {
    background: '#ebecf0',
  },
  cardQuickAddContent: {
    padding: theme.spacing(1) + 'px!important',
  },
});

export default styles;
