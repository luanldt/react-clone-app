import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Link,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import styles from "./styles";
import { Facebook, Instagram } from "@material-ui/icons";

function SignupPage(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div>
        <Paper elevation={0} square className={classes.loginWrapper}>
          <Box>
            <Typography className={classes.logo} variant="h2">
              Instagram
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth margin="normal">
              <Button
                startIcon={<Facebook />}
                variant="outlined"
                color="primary"
              >
                Login with Facebook
              </Button>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button
                startIcon={<Instagram />}
                variant="outlined"
                color="secondary"
              >
                Login with Instagram
              </Button>
            </FormControl>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Divider style={{ flex: 1 }} />
              <Typography
                variant="caption"
                style={{ paddingLeft: 8, paddingRight: 8 }}
              >
                OR
              </Typography>
              <Divider style={{ flex: 1 }} />
            </Box>
            <FormControl fullWidth margin="normal">
              <TextField fullWidth label="Email" />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField fullWidth label="Phone" />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField fullWidth label="Username" />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField fullWidth label="Password" />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button variant="contained" fullWidth color="primary">
                Đăng ký
              </Button>
            </FormControl>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Bằng việc nhấn vào nút đăng ký, bạn đã chấp nhận 
             <br/><strong>điều khoản</strong> và <strong>chính sách</strong> của Instagram.
            </Typography>
          </Box>
        </Paper>
        <Paper elevation={0} square className={classes.registerWrapper}>
          <Typography variant="caption">Đã có tài khoản?</Typography>
          <Link variant="caption">Đăng nhập</Link>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(styles)(SignupPage);
