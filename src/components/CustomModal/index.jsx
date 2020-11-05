import React, { Fragment } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import {
  BookmarkBorder,
  Close,
  CommentOutlined,
  FavoriteBorder,
  MoreVert,
  Send,
} from "@material-ui/icons";

const CustomModal = (props) => {
  const { classes } = props;
  return (
    <Modal open={false} className={classes.modalWrapper}>
      <Fragment>
        <IconButton className={classes.buttonClose}>
          <Close />
        </IconButton>
        <Paper className={classes.contentModal}>
          <Grid container>
            <Grid item xs={6}>
              <img
                sizes="405px"
                width="100%"
                alt=""
                src="https://instagram.fsgn2-6.fna.fbcdn.net/v/t51.2885-15/e35/122713786_386865346019723_8547398255481746527_n.jpg?_nc_ht=instagram.fsgn2-6.fna.fbcdn.net&_nc_cat=111&_nc_ohc=tuW3-fGZ9tEAX_1P-sl&_nc_tp=18&oh=5c3e4b2b33a8db8cf29d0e285b1b28e9&oe=5FC36D1E"
              />
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.commentWrapper}>
                <Box padding={2} className={classes.header}>
                  <Avatar
                    className={classes.avatar}
                    src="https://instagram.fsgn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/120515938_665420324370973_1977124614355898627_n.jpg?_nc_ht=instagram.fsgn2-2.fna.fbcdn.net&_nc_ohc=pcvgT5s6eSgAX9kADIG&oh=c16e9a35298671d85902fc663989490e&oe=5FBF881D"
                  />
                  <Typography variant="caption">maianh_nguyen</Typography>
                  <Typography variant="caption">Đang theo dõi</Typography>
                  <Box className={classes.grow} />
                  <IconButton edge="end">
                    <MoreVert />
                  </IconButton>
                </Box>
                <Divider />
                <List className={classes.commentZone}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        className={classes.avatar}
                        src="https://instagram.fsgn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/120515938_665420324370973_1977124614355898627_n.jpg?_nc_ht=instagram.fsgn2-2.fna.fbcdn.net&_nc_ohc=pcvgT5s6eSgAX9kADIG&oh=c16e9a35298671d85902fc663989490e&oe=5FBF881D"
                      />
                    </ListItemAvatar>
                    <div style={{ flexGrow: 1 }}>
                      <div className={classes.commentContent}>
                        <Typography variant="caption">maianhnguyen</Typography>
                        <Typography variant="subtitle2">
                          Ăn ít thôi mai anh ơi
                        </Typography>
                      </div>
                      <div className={classes.commentReaction}>
                        <Typography variant="caption">2 giờ</Typography>
                        <Typography variant="caption">2 lượt thích</Typography>
                        <Link variant="caption">Trả lời</Link>
                      </div>
                    </div>
                    <ListItemSecondaryAction>
                      <IconButton>
                        <FavoriteBorder />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <Divider />
                <Toolbar className={classes.toolbar}>
                  <Box>
                    <IconButton size="medium">
                      <FavoriteBorder fontSize="small" />
                    </IconButton>
                    <IconButton size="medium">
                      <CommentOutlined fontSize="small" />
                    </IconButton>
                    <IconButton size="medium">
                      <Send fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box className={classes.grow} />
                  <IconButton size="medium">
                    <BookmarkBorder color="action" fontSize="medium" />
                  </IconButton>
                </Toolbar>
                <Divider />
                <Box className={classes.commentContainer}>
                  <InputBase
                    variant="standard"
                    fullWidth
                    placeholder="Thêm bình luận..."
                  />
                  <Button>Đăng</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    </Modal>
  );
};

CustomModal.propTypes = {};

export default withStyles(styles)(CustomModal);
