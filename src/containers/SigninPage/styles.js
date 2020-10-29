import backgroundLogin from "../../assets/background-login.jpg";
const styles = (theme) => ({
  root: {
    background: "url(" + backgroundLogin + ")",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    margin: "22px auto 12px",
    width: "175px",
    fontSize: "25px",
    textAlign: "center",
  },
  loginWrapper: {
    border: "1px solid #dbdbdb",
    padding: theme.spacing(2),
    background: "rgba(255, 255, 255, 0.75)",
  },
  registerWrapper: {
    marginTop: theme.spacing(2),
    border: "1px solid #dbdbdb",
    padding: theme.spacing(2),
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.75)",
    "& > a": {
      marginLeft: theme.spacing(1),
    },
  },
});
export default styles;
