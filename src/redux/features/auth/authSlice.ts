import { TUser } from "@/types/signup.types";
import { createSlice } from "@reduxjs/toolkit";

type TAuthInitialState = {
  user: TUser | null;
  token: string | null;
  image: string | null;
  googleUiu: string | null;
  registerEventId: string;
};

const initialState: TAuthInitialState = {
  user: null,
  token: null,
  image: null,
  googleUiu: null,
  registerEventId: "",
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
    setRegisterEventId: (state, actions) => {
      state.registerEventId = actions.payload;
    },
  },
});

export const { setUser, logOut, setRegisterEventId } = authSlice.actions;

export default authSlice.reducer;
