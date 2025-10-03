import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "../../../types/auth.type";

type TAuthInitialState = {
  user: TUser | null;
  token: string | null;
  image: string | null;
  googleUiu: string | null;
};

const initialState: TAuthInitialState = {
  user: null,
  token: null,
  image: null,
  googleUiu: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      const { user, token, uid } = actions.payload;
      state.user = user;
      state.token = token;
      state.googleUiu = uid;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.googleUiu = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
