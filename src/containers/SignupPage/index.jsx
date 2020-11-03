import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./styles";
import { Facebook, Instagram, Mood } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../actions/auth";

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    size="small"
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const validate = (values) => {
  const errors = {};
  const requiredFields = ["email", "phone", "username", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

function SignupPage(props) {
  const {
    authActionCreators,
    classes,
    pristine,
    submitting,
    valid,
    handleSubmit,
  } = props;

  const handleSubmitRegister = (data) => {
    const { register } = authActionCreators;
    register(data);
  };

  const handleLoginWithGoogle = () => {
    const { loginWithGoogle } = authActionCreators;
    loginWithGoogle();
  };

  const handleLoginWithFacebook = () => {
    const { loginWithFacebook } = authActionCreators;
    loginWithFacebook();
  };

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
                onClick={handleLoginWithFacebook}
              >
                Login with Facebook
              </Button>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button
                startIcon={<Mood />}
                variant="outlined"
                color="secondary"
                onClick={handleLoginWithGoogle}
              >
                Login with Google
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
            <form onSubmit={handleSubmit(handleSubmitRegister)}>
              <FormControl fullWidth margin="normal">
                <Field
                  component={renderTextField}
                  label="Email"
                  type="email"
                  name="email"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Field
                  component={renderTextField}
                  label="Phone"
                  type="text"
                  name="phone"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Field
                  component={renderTextField}
                  label="Username"
                  type="text"
                  name="username"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Field
                  component={renderTextField}
                  label="Password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Button
                  type="submit"
                  disabled={pristine || submitting || !valid}
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Đăng ký
                </Button>
              </FormControl>
              <Typography variant="body1" style={{ textAlign: "center" }}>
                Bằng việc nhấn vào nút đăng ký, bạn đã chấp nhận
                <br />
                <strong>điều khoản</strong> và <strong>chính sách</strong> của
                Instagram.
              </Typography>
            </form>
          </Box>
        </Paper>
        <Paper elevation={0} square className={classes.registerWrapper}>
          <Typography variant="caption">Đã có tài khoản?</Typography>
          <Link to="/login">
            <Typography variant="caption">Đăng nhập</Typography>
          </Link>
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, props) => ({
  authActionCreators: bindActionCreators(authActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReduxForm = reduxForm({
  form: "signup",
  validate,
});

export default compose(
  withConnect,
  withReduxForm,
  withStyles(styles)
)(SignupPage);
