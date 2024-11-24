import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state. The token will be loaded from localStorage, but userData is null initially
const initialState = {
  status: false,
  userData: null,
  accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
};

// Define the slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userData: any; accessToken: string }>) => {
      // Set the user data in Redux store
      state.status = true;
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;

      // Store the token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
    logout: (state) => {
      console.log("Logout");
      // Clear the user data and token
      state.status = false;
      state.userData = null;
      state.accessToken = null;

      // Remove the token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        console.log("Logout -> 2");
      }
    },
    // Action to load the token from localStorage and update the Redux store
    setTokenFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
          state.accessToken = storedToken;
          state.status = true; // If there's a token, consider the user authenticated
        }
      }
    },
  },
});

export const { login, logout, setTokenFromStorage } = authSlice.actions;

export default authSlice.reducer;
