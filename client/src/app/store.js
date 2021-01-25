import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import registerReducer from "../reducers/registerSlice";
import snackReducer from "../reducers/snackSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    snack: snackReducer,
  },
});
