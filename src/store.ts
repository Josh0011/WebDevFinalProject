// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/Protection/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
