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
import { registerUser } from "../reducers/registerSlice";

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
  email: yup.string().required("Email required").email("Not a Valid Email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  name: yup
    .string()
    .required("First Name Required")
    .max(8, "Maximum 8 Characters"),
});

const RegisterScreen = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { loading, error, userInfo } = userLogin;
  const location = useLocation();
  const history = useHistory();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onClickHandler = (data) => {
    const { name, email, password } = data;
    dispatch(registerUser(name, email, password));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={2} sm={4} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid item xs={8} sm={4} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4" color="initial" className={classes.title}>
              SIGN UP
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Name
            </Typography>
            <TextField
              name="name"
              label="Enter Name"
              variant="filled"
              fullWidth={true}
              size={"small"}
              inputRef={register}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Email Address
            </Typography>
            <TextField
              name="email"
              label="Enter Email"
              variant="filled"
              fullWidth={true}
              size={"small"}
              inputRef={register}
              type="email"
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
              type="password"
              inputRef={register}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Confirm Password
            </Typography>
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              variant="filled"
              fullWidth={true}
              size={"small"}
              type="password"
              inputRef={register}
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit((data) => onClickHandler(data))}
            >
              REGISTER
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Already Registered? <Spacer amount={2} />
              <Link to="/" className={classes.linkdeco}>
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid item xs={2} sm={4} />
    </Grid>
  );
};

export default RegisterScreen;
