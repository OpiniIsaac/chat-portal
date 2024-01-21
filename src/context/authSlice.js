import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
     "id" : "65aa1a4bb8aa74d02f4cb807",
     "name": "opini"

    },
    isAuthenticated: false,
  },
  reducers: {
    loginUser(state, action) {
      const { id, name, username,} = action.payload;

      if (username) {
        state.user = { id, name, username };
        state.isAuthenticated = true;
      }
    },
    logoutUser(state) {
      // Reset user and authentication status
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
