import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spacer from "react-add-space";

//MUI Libs
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

//Modular imports
import { login, user_login_failure_cleanup } from "../reducers/userSlice";

//Form Validation Libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "60vh",
  },
  title: {
    marginTop: "5vh",
  },
  linkdeco: {
    textDecoration: "none",
  },
}));

//Form Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Not a Valid Email").required("Email required"),
  password: yup.string().required("Password required"),
});

const LoginScreen = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { loading, error, userInfo } = userLogin;
  const location = useLocation();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      history.push(redirect);
    }
    return () => {
      dispatch(user_login_failure_cleanup());
    };
  }, [history, userInfo, redirect, dispatch]);

  const onClickHandler = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1} sm={4} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid item xs={10} sm={4} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4" color="initial" className={classes.title}>
              SIGN IN
            </Typography>
          </Grid>
          {error ? (
            <Grid item>
              <Alert severity="error">{error}</Alert>
            </Grid>
          ) : null}
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Email Address
            </Typography>
            <TextField
              name="email"
              label="Enter Email"
              variant="filled"
              fullWidth={true}
              type="email"
              size={"small"}
              inputRef={register}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>

          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Password
            </Typography>
            <TextField
              name="password"
              label="Enter Password"
              variant="filled"
              fullWidth={true}
              size={"small"}
              inputRef={register}
              error={!!errors.password}
              helperText={errors?.password?.message}
              type="password"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit((data) => onClickHandler(data))}
            >
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
