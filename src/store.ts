// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/Protection/authReducer";
import profileReducer from "./components/Profile/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
