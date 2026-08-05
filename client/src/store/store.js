import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
});

export default store;
