import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import registerReducer from '../reducers/registerSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
  },
});
