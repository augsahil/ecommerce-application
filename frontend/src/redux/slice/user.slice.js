import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = UserSlice.actions;

export const UserSlicePath = (store) => store.UserSlice.user;
