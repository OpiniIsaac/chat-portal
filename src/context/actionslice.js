import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "auth",
  initialState: {
    group: null,
   
  },
  reducers: {
    clicked(state, action) {
         state.group = action.payload
    },
    logoutUser(state) {
      // Reset user and authentication status
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const groupActions = groupSlice.actions;
export default groupSlice;
