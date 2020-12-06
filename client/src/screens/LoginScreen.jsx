import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Spacer from 'react-add-space';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/userSlice';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '60vh',
  },
  title: {
    marginTop: '5vh',
  },
  linkdeco: {
    textDecoration: 'none',
  },
}));

const LoginScreen = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { loading, error, userInfo } = userLogin;
  const location = useLocation();
  const history = useHistory();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1} sm={4} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid item xs={10} sm={4} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4" color="initial" className={classes.title}>
              SIGN IN
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Email Address
            </Typography>
            <TextField
              label="Enter Email"
              variant="filled"
              fullWidth={true}
              size={'small'}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Password
            </Typography>
            <TextField
              label="Enter Password"
              variant="filled"
              fullWidth={true}
              size={'small'}
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              SIGN IN
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Not Registered? <Spacer amount={2} />
              <Link to="/register" className={classes.linkdeco}>
                Register
              </Link>
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid item xs={1} sm={4} />
    </Grid>
  );
};

export default LoginScreen;
