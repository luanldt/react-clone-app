import {
  Box,
  Button,
  Divider,
  FormControl,
  Paper,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import { Facebook, Mood } from "@material-ui/icons";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/auth";
import styles from "./styles";

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

function SigninPage(props) {
  const {
    classes,
    authActionCreators,
    authed,
    handleSubmit,
    pristine,
    valid,
    submitting,
  } = props;

  const handleLoginWithGoogle = () => {
    const { loginWithGoogle } = authActionCreators;
    loginWithGoogle();
  };

  const handleLoginWithFacebook = () => {
    const { loginWithFacebook } = authActionCreators;
    loginWithFacebook();
  };

  const handleLoginUsernamePassword = (data) => {
    const { login } = authActionCreators;
    if (login) {
      login(data);
    }
  };

  return (
    <Fragment>
      {authed && <Redirect to="/timeline" />}
      <div className={classes.root}>
        <div>
          <Paper elevation={0} square className={classes.loginWrapper}>
            <Box>
              <Typography className={classes.logo} variant="h2">
                Instagram
              </Typography>
            </Box>
            <Box>
              <form onSubmit={handleSubmit(handleLoginUsernamePassword)}>
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
                    label="Password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Button
                    disabled={pristine || submitting || !valid}
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                  >
                    Đăng nhập
                  </Button>
                </FormControl>
              </form>
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
            </Box>
          </Paper>
          <Paper elevation={0} square className={classes.registerWrapper}>
            <Typography variant="caption">Bạn chưa có tài khoản?</Typography>
            <Link to="/register">
              <Typography variant="caption">Đăng ký</Typography>
            </Link>
          </Paper>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
});

const mapDispatchToProps = (dispatch, props) => ({
  authActionCreators: bindActionCreators(authActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReduxForm = reduxForm({
  form: "LOGIN",
  validate: validate,
});

export default compose(
  withConnect,
  withReduxForm,
  withStyles(styles)
)(SigninPage);
