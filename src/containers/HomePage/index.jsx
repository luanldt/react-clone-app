import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  BookmarkBorder as BookmarkBorderIcon,
  CommentOutlined as CommentOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  MoreHoriz as MoreHorizIcon,
  Person,
  Send as SendIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { compose } from "redux";
import Header from "../Header";
import styles from "./styles";

function HomePage(props) {
  const { classes } = props;
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img alt="" src={file.preview} className={classes.img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="md" spacing={2} className={classes.container}>
        <Grid item md={8} xs={12}>
          <div>
            <Paper variant="outlined" square>
              <Box padding={2}>
                <List className={classes.listWrapper}>
                  {[1, 2, 3, 4, 5, 6].map(() => (
                    <ListItemAvatar className={classes.avatarWrapper}>
                      <div className={classes.avatarWrapperImage}>
                        <Avatar
                          className={classes.avatar}
                          src="https://instagram.fsgn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/120515938_665420324370973_1977124614355898627_n.jpg?_nc_ht=instagram.fsgn2-2.fna.fbcdn.net&_nc_ohc=pcvgT5s6eSgAX9kADIG&oh=c16e9a35298671d85902fc663989490e&oe=5FBF881D"
                        ></Avatar>
                      </div>
                    </ListItemAvatar>
                  ))}
                </List>
              </Box>
            </Paper>
          </div>
          <Box marginTop={4}>
            <Paper variant="outlined" square>
              <Box padding={2}>
                <InputBase fullWidth placeholder="Bạn đang nghĩ gì? 👀" />
                <div {...getRootProps()} className={classes.dropzone}>
                  <input {...getInputProps()} />
                  <p>Kéo và thả một số tệp tại đây hoặc nhấp để chọn tệp</p>
                </div>
                <div className={classes.thumbContainer}>{thumbs}</div>
                <div className={classes.buttonWrapper}>
                  <Button edge="end" variant="contained" color="primary">
                    Đăng
                  </Button>
                </div>
              </Box>
            </Paper>
          </Box>
          <div className={classes.postContainer}>
            <Card className={classes.postCard} elevation={0}>
              <CardHeader
                avatar={
                  <Avatar src="https://instagram.fsgn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/120515938_665420324370973_1977124614355898627_n.jpg?_nc_ht=instagram.fsgn2-2.fna.fbcdn.net&_nc_ohc=pcvgT5s6eSgAX9kADIG&oh=c16e9a35298671d85902fc663989490e&oe=5FBF881D"></Avatar>
                }
                title="maianh1108_bh"
                action={
                  <IconButton>
                    <MoreHorizIcon />
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
                    <Typography variant="span">
                      Cô đơn chính là yêu sai thời điểm
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="p">Xem tất cả 17 bình luận</Typography>
                  </Box>

                  <List className={classes.comment}>
                    <ListItem className={classes.commentItem}>
                      <Typography
                        className={classes.userCaption}
                        variant="span"
                      >
                        teoem_kute
                      </Typography>
                      <Typography variant="span">
                        Bố lại tin mày cơ...
                      </Typography>
                      <Box className={classes.grow} />
                      <FavoriteBorderIcon />
                    </ListItem>
                    <ListItem className={classes.commentItem}>
                      <Typography
                        className={classes.userCaption}
                        variant="span"
                      >
                        meocucxuk
                      </Typography>
                      <Typography variant="span">Sai sai cc...</Typography>
                      <Box className={classes.grow} />
                      <FavoriteBorderIcon />
                    </ListItem>
                    <Box>
                      <Typography className={classes.postTime}>
                        1 ngày trước
                      </Typography>
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
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item md={4}>
            <Box paddingLeft={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      className={classes.avatarUser}
                      src="https://instagram.fsgn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/72730331_463843944291039_7620925283519954944_n.jpg?_nc_ht=instagram.fsgn2-2.fna.fbcdn.net&_nc_ohc=8eZMckPQcMMAX9xdvAZ&oh=9cedc124349b687e5edec1151a3b4a57&oe=5FC1F263"
                    />
                  }
                  title="luanldt1905"
                  subheader="Nguyễn Minh Luận"
                />
                <CardContent>
                  <Box>
                    <Typography>Gợi ý dành cho bạn</Typography>
                  </Box>
                  <List>
                    {[1, 2, 3, 4, 5].map(() => (
                      <ListItem className={classes.suggestRow}>
                        <ListItemAvatar>
                          <Avatar src="https://instagram.fsgn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/72730331_463843944291039_7620925283519954944_n.jpg?_nc_ht=instagram.fsgn2-2.fna.fbcdn.net&_nc_ohc=8eZMckPQcMMAX9xdvAZ&oh=9cedc124349b687e5edec1151a3b4a57&oe=5FC1F263" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Uyen Nguyen"
                          secondary="Mèo gợi ý cho bạn"
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            className={classes.followPerson}
                            size="small"
                            edge="end"
                          >
                            <Person />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardContent>
                  <Link>Giới thiệu</Link>
                  <Link>Trợ giúp</Link>
                  <Link>Báo trí</Link>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Hidden>
      </Container>
    </div>
  );
}

HomePage.propTypes = {};

export default compose(withStyles(styles))(HomePage);
