const styles = (theme) => ({
  root: {
    backgroundColor: "#fafafa",
  },
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
  },
  listWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-aroud",
  },
  avatarWrapper: {
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  avatarWrapperImage: {
    border: "2px solid orange",
    borderRadius: "50%",
  },
  postContainer: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    width: 60 + "px",
    height: 60 + "px",
    border: "1px solid transparent",
  },
  mediaWrapper: {
    padding: 0,
  },
  grow: {
    flexGrow: 1,
  },
  toolbarWrapper: {
    padding: 0,
  },
  toolbar: {
    padding: 0,
    minHeight: "auto",
  },
  avatarUser: {
    width: 60 + "px",
    height: 60 + "px",
  },
  suggestRow: {
    padding: 0,
  },
  postCard: {
    border: "1px solid #dbdbdb",
  },
  followPerson: {
    right: 0,
    marginRight: "-12px!important",
  },
  comment: {
    padding: 0,
  },
  commentItem: {
    padding: 0,
    paddingRight: theme.spacing(2),
  },
  numberLikeWrapper: {
    paddingTop: 0,
  },
  numberLike: {
    fontSize: "0.75rem",
  },
  captionWrapper: {
    display: "flex",
  },
  userCaption: {
    fontWeight: "bold",
    paddingRight: theme.spacing(1),
  },
  commentContainer: {
    borderTop: "1px solid #dbdbdb",
    display: "flex",
    padding: theme.spacing(1) + "px!important",
  },
  postTime: {
    paddingBottom: theme.spacing(1),
    fontSize: "0.65rem",
    textTransform: "uppercase",
  },
  dropzone: {
    marginTop: theme.spacing(2),
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    "&:focus": {
      borderColor: "#2196f3",
    },
  },
  thumbContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing(2),
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
});

export default styles;
