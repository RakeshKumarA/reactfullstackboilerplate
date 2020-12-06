import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userInfo: {},
    error: '',
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
    user_logout: (state, action) => {
      return {};
    },
  },
});

export const {
  user_login_request,
  user_login_sucess,
  user_login_failure,
  user_logout,
} = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(user_login_request());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    dispatch(user_login_sucess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(user_login_failure(error.message));
  }
};

export default userSlice.reducer;
