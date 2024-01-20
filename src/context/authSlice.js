import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginUser(state, action) {
      const { id, name, username, password } = action.payload;

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
    addUser(state, action) {
      const { id, name } = action.payload;

      // For simplicity, assume adding a user directly to the state
      state.user = { id, name };
      state.isAuthenticated = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
