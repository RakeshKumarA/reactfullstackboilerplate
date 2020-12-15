import React from "react";
import Button from "@material-ui/core/Button";
import { user_logout } from "../reducers/userSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(user_logout());
  };

  return (
    <div>
      <h1>This is Dashboard</h1>
      <Button variant="contained" color="primary" onClick={onLogoutClick}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
