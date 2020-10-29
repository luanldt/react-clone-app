const styles = (theme) => ({
  modalWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentModal: {
    width: "80%",
  },
  buttonClose: {
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  linkReply: {
    display: "inline-block",
  },
  commentContent: {
    display: "flex",
    alignItems: "center",
    "& > span": {
      fontWeight: "bold",
    },
    "& > h6": {
      marginLeft: theme.spacing(1),
    },
  },
  commentReaction: {
    "& > span + span": {
      marginLeft: theme.spacing(1),
    },
    " & > a": {
      marginLeft: theme.spacing(1),
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      marginRight: theme.spacing(2),
    },
    "& > span + span": {
      marginLeft: theme.spacing(1),
    },
    "& > span": {
      fontSize: "1rem",
    },
  },
  commentZone: {
    flexGrow: 1,
  },
  commentContainer: {
    display: "flex",
    padding: theme.spacing(2),
  },
  commentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});

export default styles;
