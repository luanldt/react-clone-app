import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Person } from "@material-ui/icons";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as postActions from "../../actions/post";
import cover from "../../assets/nature-design.jpg";
import Post from "../../components/Post";
import PostUpload from "../../components/PostUpload";
import Header from "../Header";
import styles from "./styles";

function HomePage(props) {
  const { classes, currentUser, authed, postActionCreators, posts } = props;
  const { fetchListPost } = postActionCreators;

  let photoURL = null;
  if (authed && currentUser) {
    photoURL = currentUser.photoURL;
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    fetchListPost();
  };

  useEffect(() => {
    fetchListPost();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderListPost = () => posts.map((post) => <Post post={post} />);

  return (
    <div className={classes.root}>
      <Header />
      <div
        className={classes.cover}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundPosition: "50% 100%",
          backgroundSize: "cover",
        }}
      >
        {photoURL ? (
          <Avatar
            className={classes.primaryAvatar}
            sizes="100px, 100px"
            src={photoURL}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
      <Container maxWidth="md" spacing={2} className={classes.container}>
        <Hidden smDown>
          <Grid item md={4}>
            <Box paddingRight={3}>
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
        <Grid item md={8} xs={12}>
          <PostUpload />
          <div className={classes.postContainer}>
            {renderListPost()}
            <CircularProgress />
          </div>
        </Grid>
      </Container>
    </div>
  );
}

HomePage.propTypes = {};

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
  currentUser: state.auth.currentUser,
  posts: state.post.posts,
});

const mapDispatchToProps = (dispatch, props) => ({
  postActionCreators: bindActionCreators(postActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(HomePage);
