import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { user_login_sucess } from "./userSlice";

export const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {
    user_register_request: (state) => {
      state.loading = true;
      state = {};
    },
    user_register_sucess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    user_register_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  user_register_request,
  user_register_sucess,
  user_register_failure,
} = registerSlice.actions;

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(user_register_request());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );
    window.location = "/";
    dispatch(user_register_sucess(data));
    dispatch(user_login_sucess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(user_register_failure(error.message));
  }
};

export default registerSlice.reducer;
