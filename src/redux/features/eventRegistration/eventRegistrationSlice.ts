import { createSlice } from "@reduxjs/toolkit";

type TEventRegistrationSliceInitialState = {
  eventId: string;
};

const initialState: TEventRegistrationSliceInitialState = {
  eventId: "",
};

const eventRegistrationSlice = createSlice({
  name: "eventRegistration",
  initialState,
  reducers: {
    setEventId: (state, actions) => {
      state.eventId = actions.payload;
    },
  },
});

export const { setEventId } = eventRegistrationSlice.actions;

export default eventRegistrationSlice.reducer;
