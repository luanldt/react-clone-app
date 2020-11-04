import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
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
  Paper,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Person } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as postActions from "../../actions/post";
import Post from "../../components/Post";
import PostUpload from "../../components/PostUpload";
import Header from "../Header";
import styles from "./styles";

function HomePage(props) {
  const { classes } = props;

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
          <Box paddingTop={4}>
            <PostUpload />
          </Box>
          <div className={classes.postContainer}>
            <Post />
            <Post />
            <Post />
            <Post />
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

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});

const mapDispatchToProps = (dispatch, props) => ({
  postActionCreators: bindActionCreators(postActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(HomePage);
