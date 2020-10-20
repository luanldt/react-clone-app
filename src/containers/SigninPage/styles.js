import bgLogin from '../../assets/images/bg_login.jpg';
const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url(' + bgLogin + ')',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
  },
  loginWrapper: {
    position: 'relative',
    overflow: 'inherit',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    borderLeft: '3px solid ' + theme.palette.primary.main,
    padding: theme.spacing(1),
  },
  buttonRegister: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    borderRadius: '50%',
    width: '64px',
    height: '64px',
    top: '5px',
    right: '-32px',
    position: 'absolute',
  },
  linkRegister: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
});

export default styles;
