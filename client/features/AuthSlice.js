import { createSlice } from "@reduxjs/toolkit";
import user from "../models/User";

const initialState = {
  authData: {
    ...user,
    isLoggedIn: true,
  },
  allUsers: [],
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    setUsersData: (state, action) => {
      state.allUsers = action.payload;
    },
    setLogout: (state) => {
      const newAuthData = { loggedIn: false };
      state.authData = newAuthData;
    },
  },
});

export const { setAuthData, setLogout, setUsersData } = AuthSlice.actions;

export default AuthSlice.reducer;
