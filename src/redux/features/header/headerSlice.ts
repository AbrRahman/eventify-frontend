import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: "",
};
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: () => ({
    setActiveMenu: (state, actions) => {
      state.activeMenu = actions?.payload;
    },
  }),
});
export const { setActiveMenu } = headerSlice.actions;
export default headerSlice.reducer;
