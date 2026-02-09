import { createSlice } from "@reduxjs/toolkit";
import { initializeAuthStatus, executeOnboarding } from "./authThunk";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  role: string;
  isLoading: boolean;
  initialized: boolean;
  onboarded: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  role: "",
  isLoading: false,
  initialized: false,
  onboarded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: () => ({ ...initialState, initialized: true }),
    setAuthFailure: (state) => {
      state.isAuthenticated = false;
      state.initialized = true;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // ================================
    // AUTH INIT
    // ================================
    builder

      .addCase(initializeAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.initialized = true;

        if (action.payload) {
          state.isAuthenticated = true;
          state.onboarded = action.payload.onboarded;
          state.email = action.payload.email;
          state.role = action.payload.role ?? "";
        }
      })
      .addCase(initializeAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.initialized = true;
      });

    // ================================
    // USER ONBOARDING
    // ================================
    builder
      .addCase(executeOnboarding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(executeOnboarding.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.onboarded = action.payload.onboarded;
          state.email = action.payload.email;
          state.role = action.payload.role ?? "";
        }
      })
      .addCase(executeOnboarding.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearAuth, setAuthFailure } = authSlice.actions;
export default authSlice.reducer;
