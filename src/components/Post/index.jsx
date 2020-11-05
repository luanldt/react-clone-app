import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  BookmarkBorder as BookmarkBorderIcon,
  CommentOutlined as CommentOutlinedIcon,
  Favorite,
  FavoriteBorder as FavoriteBorderIcon,
  MoreHoriz,
  Remove,
  Send as SendIcon,
} from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";

const renderTextField = ({
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <InputBase fullWidth placeholder="Thêm bình luận..." {...input} {...custom} />
);

function Post(props) {
  const {
    classes,
    post,
    onDeletePost,
    onLikePost,
    handleSubmit,
    onCommentPost,
    reset,
  } = props;
  const [anchorElPostMenu, setAnchorElPostMenu] = useState(null);

  const renderMenuPost = () => (
    <Menu
      anchorEl={anchorElPostMenu}
      open={Boolean(anchorElPostMenu)}
      onClose={handleCloseMenuPost}
    >
      <MenuItem onClick={handleDeletePost}>
        <ListItemIcon>
          <Remove size="small" />
        </ListItemIcon>
        <Typography variant="caption">Remove</Typography>
      </MenuItem>
    </Menu>
  );

  const handleCloseMenuPost = () => setAnchorElPostMenu(null);

  const handleOpenMenuPost = (e) => {
    setAnchorElPostMenu(e.currentTarget);
  };

  const handleSubmitComment = (data) => {
    if (!onCommentPost) {
      return;
    }
    onCommentPost({ key: post.key, content: data.content });
    reset();
  };

  const handleDeletePost = () => {
    if (!onDeletePost) {
      return;
    }

    onDeletePost({ key: post.key });

    handleCloseMenuPost();
  };

  const renderComment = () => {
    let xhtml = "";
    const { comments } = post;
    if (comments) {
      xhtml = comments.map((comment) => (
        <ListItem className={classes.commentItem}>
          <Typography className={classes.userCaption} variant="span">
            {comment.user?.username}
          </Typography>
          <Typography variant="span">{comment.content}</Typography>
          <Box className={classes.grow} />
          <FavoriteBorderIcon />
        </ListItem>
      ));
    }
    return xhtml;
  };

  const handleLikePost = () => {
    if (!onLikePost) {
      return;
    }
    onLikePost({ key: post.key });
  };

  return (
    <Fragment>
      <Card className={classes.postCard} elevation={0}>
        <CardHeader
          avatar={<Avatar src={post.user.photoURL} />}
          title={post.user.username}
          action={
            <IconButton onClick={handleOpenMenuPost}>
              <MoreHoriz />
            </IconButton>
          }
        />
        <CardContent className={classes.mediaWrapper}>
          {post.files && (
            <img
              alt={post.files[0].fileName}
              width="100%"
              src={post.files[0].fileURL}
            />
          )}
        </CardContent>
        <CardContent className={classes.toolbarWrapper}>
          <Toolbar className={classes.toolbar}>
            <Box>
              <IconButton size="medium" onClick={handleLikePost}>
                {post.liked ? (
                  <Favorite color="error" fontSize="medium" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton size="medium">
                <CommentOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="medium">
                <SendIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box className={classes.grow} />
            <IconButton size="medium">
              <BookmarkBorderIcon color="action" fontSize="small" />
            </IconButton>
          </Toolbar>
          <Box paddingLeft={2}>
            <Box className={classes.numberLikeWrapper}>
              <Typography className={classes.numberLike} variant="p">
                Có {post.numberLike} lượt thích
              </Typography>
            </Box>
            <Box className={classes.captionWrapper}>
              <Typography variant="span" className={classes.userCaption}>
                maianh1108_bh
              </Typography>
              <Typography variant="span">{post.content}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                Xem tất cả {post.numberComment} bình luận
              </Typography>
            </Box>

            <List className={classes.comment}>
              {renderComment()}
              <Box>
                <Typography className={classes.postTime}>
                  {post.postAt}
                </Typography>
              </Box>
            </List>
          </Box>
        </CardContent>
        <form onSubmit={handleSubmit(handleSubmitComment)}>
          <CardContent className={classes.commentContainer}>
            <Field name="content" component={renderTextField} />
            <Button type="submit">Đăng</Button>
          </CardContent>
        </form>
      </Card>
      {renderMenuPost()}
    </Fragment>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  classes: PropTypes.object,
  onLikePost: PropTypes.func,
};

const withReduxForm = reduxForm({
  form: "COMMENT",
  enableReinitialize: true,
});

export default withReduxForm(withStyles(styles)(Post));
