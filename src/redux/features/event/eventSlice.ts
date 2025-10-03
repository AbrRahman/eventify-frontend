import { createSlice } from "@reduxjs/toolkit";

type TEventInitialState = {
  searchTerm: string;
};

const initialState: TEventInitialState = {
  searchTerm: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setSearchTerm: (state, actions) => {
      state.searchTerm = actions.payload;
    },
  },
});

export const { setSearchTerm } = eventSlice.actions;

export default eventSlice.reducer;
