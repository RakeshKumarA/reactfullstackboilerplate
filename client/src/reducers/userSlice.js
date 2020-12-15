import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: userInfoFromStorage,
    error: "",
  },
  reducers: {
    user_login_request: (state) => {
      state.loading = true;
      state.userInfo = {};
    },
    user_login_sucess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    user_login_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    user_login_failure_cleanup: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    user_logout: (state, action) => {
      localStorage.removeItem("userInfo");
      return {};
    },
  },
});

export const {
  user_login_request,
  user_login_sucess,
  user_login_failure,
  user_login_failure_cleanup,
  user_logout,
} = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(user_login_request());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    if (data.status === 200) {
      delete data.status;
      dispatch(user_login_sucess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(user_login_failure(error.message));
  }
};

export default userSlice.reducer;
