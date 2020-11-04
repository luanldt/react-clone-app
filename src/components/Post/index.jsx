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
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  BookmarkBorder as BookmarkBorderIcon,
  CommentOutlined as CommentOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  MoreHoriz,
  Send as SendIcon,
} from "@material-ui/icons";
import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import PropTypes from "prop-types";

Post.propTypes = {
  post: PropTypes.object,
  classes: PropTypes.object,
};

function Post(props) {
  const { classes, post } = props;
  return (
    <Card className={classes.postCard} elevation={0}>
      <CardHeader
        avatar={
          <Avatar src="https://instagram.fsgn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/120515938_665420324370973_1977124614355898627_n.jpg?_nc_ht=instagram.fsgn2-2.fna.fbcdn.net&_nc_ohc=pcvgT5s6eSgAX9kADIG&oh=c16e9a35298671d85902fc663989490e&oe=5FBF881D"></Avatar>
        }
        title="maianh1108_bh"
        action={
          <IconButton>
            <MoreHoriz />
          </IconButton>
        }
      />
      <CardContent className={classes.mediaWrapper}>
        <img
          alt=""
          width="100%"
          src="https://instagram.fsgn2-3.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/122682811_208015497410672_6186903154575799836_n.jpg?_nc_ht=instagram.fsgn2-3.fna.fbcdn.net&_nc_cat=108&_nc_ohc=TWEn3C7vdQYAX8JY5NX&tp=19&oh=1727f778c1897712cd1298d6a93f9fcb&oe=5FBFD9D8"
        />
      </CardContent>
      <CardContent className={classes.toolbarWrapper}>
        <Toolbar className={classes.toolbar}>
          <Box>
            <IconButton size="medium">
              <FavoriteBorderIcon fontSize="medium" />
            </IconButton>
            <IconButton size="medium">
              <CommentOutlinedIcon fontSize="medium" />
            </IconButton>
            <IconButton size="medium">
              <SendIcon fontSize="medium" />
            </IconButton>
          </Box>
          <Box className={classes.grow} />
          <IconButton size="medium">
            <BookmarkBorderIcon color="action" fontSize="medium" />
          </IconButton>
        </Toolbar>
        <Box paddingLeft={2}>
          <Box className={classes.numberLikeWrapper}>
            <Typography className={classes.numberLike} variant="p">
              Có 3 lượt thích
            </Typography>
          </Box>
          <Box className={classes.captionWrapper}>
            <Typography variant="span" className={classes.userCaption}>
              maianh1108_bh
            </Typography>
            <Typography variant="span">{post.content}</Typography>
          </Box>
          <Box>
            <Typography variant="p">Xem tất cả 17 bình luận</Typography>
          </Box>

          <List className={classes.comment}>
            <ListItem className={classes.commentItem}>
              <Typography className={classes.userCaption} variant="span">
                teoem_kute
              </Typography>
              <Typography variant="span">Bố lại tin mày cơ...</Typography>
              <Box className={classes.grow} />
              <FavoriteBorderIcon />
            </ListItem>
            <ListItem className={classes.commentItem}>
              <Typography className={classes.userCaption} variant="span">
                meocucxuk
              </Typography>
              <Typography variant="span">Sai sai cc...</Typography>
              <Box className={classes.grow} />
              <FavoriteBorderIcon />
            </ListItem>
            <Box>
              <Typography className={classes.postTime}>1 ngày trước</Typography>
            </Box>
          </List>
        </Box>
      </CardContent>
      <CardContent className={classes.commentContainer}>
        <InputBase
          variant="standard"
          fullWidth
          placeholder="Thêm bình luận..."
        />
        <Button>Đăng</Button>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Post);
