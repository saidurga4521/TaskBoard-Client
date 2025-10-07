// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, login } from "../services/auth";

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userData) => {
    const response = await signUp(userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials) => {
    const response = await login(credentials);
    return response.data;
  }
);

const initialState = {
  isLoading: false,
  user: {
    name: "",
    email: "",
    userId: "",
  },
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { name: "", email: "", userId: "" };
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          userId: action.payload.userId,
        };
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Signup failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          userId: action.payload.userId,
        };
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
